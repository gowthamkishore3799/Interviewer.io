import { XOutlined } from "@ant-design/icons";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { Button } from "antd";
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleInterviewConversation, uploadTranscriptVideo } from "../api/jobs";
import { INTERVIEW_PROCESSING_STATUS, STATUS_LABEL_MAP } from "../constants";
import { useAuth } from "../context/AuthRouter";

export default function InterviewUI2() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const interviewId = location.pathname.split("/")[2];
  
  const [volume, setVolume] = useState(0);
  const [speakingStatus, setSpeakingStatus] = useState<INTERVIEW_PROCESSING_STATUS>(
    INTERVIEW_PROCESSING_STATUS.THINKING
  );
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const volumeAnimationRef = useRef<number | null>(null);
  
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isAiSpeakingRef = useRef(false);
  const micRef = useRef<any>(null);
  
  const speakingRef = useRef<INTERVIEW_PROCESSING_STATUS>(INTERVIEW_PROCESSING_STATUS.THINKING);

  const debouncedHandleUserResponse = useRef(
    debounce((transcript?: string, audioBase64?: string) => {
      handleUserResponse(transcript, audioBase64);
    }, 2000)
  ).current;

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const updateSpeakingStatus = useCallback((status: INTERVIEW_PROCESSING_STATUS) => {
    speakingRef.current = status;
    setSpeakingStatus(status);
  }, []);

  // Handle user response
  const handleUserResponse = useCallback(async (userResponse?: string, base64?: string) => {
    if (!user || !interviewId) return;

    try {
      const response = await handleInterviewConversation(user.userId, interviewId, userResponse, base64);
      if (!response.ok) throw new Error("Interview error");

      const data = await response.json();
      speak(data.conversation.response);

      if (data.conversation.status === "interview_completed") {
        handleEndCall();
      }
    } catch (error) {
      console.error("Interview processing error:", error);
    }
  }, [user, interviewId]);

  // Safe wrapper for handleUserResponse
  const safeHandleUserResponse = useCallback((transcript?: string, audioBase64?: string) => {
    updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.THINKING);
    debouncedHandleUserResponse(transcript, audioBase64);
  }, [debouncedHandleUserResponse]);

  const mic = useMicVAD({
    onSpeechStart: () => {
      if (!isAiSpeakingRef.current) {
        updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.LISTENING);
      }
    },
    onSpeechEnd: async (audioArray: Float32Array) => {
      if (!isAiSpeakingRef.current) {
        const wavBuffer = utils.encodeWAV(audioArray)
        const base64 = utils.arrayBufferToBase64(wavBuffer)
        // safeHandleUserResponse("", base64)
      }
    },
    onVADMisfire: () => {
      console.log("VAD misfire detected");
    }
  });


  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1.5;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    // utterance.voice = voices.find((v) => v.lang === "en-US") || null;

    const googleVoice = voices.find(
      (v) => v.name === "Google US English" || v.name.includes("Google") && v.lang === "en-US" 
    );
    console.log(voices)
  
    utterance.voice = googleVoice || voices.find(v => v.lang === "en-US") || null;
    
    utterance.onstart = () => {
      if (micRef.current) {
        micRef.current.pause();
        console.log("AI starting to speak, pausing VAD");
      }
      updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.SPEAKING);
      isAiSpeakingRef.current = true;
    };
    
    utterance.onend = () => {
      setTimeout(() => {
        if (micRef.current) {
          try {
            micRef.current.toggle();
          } catch (error) {
            console.error("Failed to restart VAD:", error);
          }
        }
        updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.LISTENING);
        isAiSpeakingRef.current = false;
      }, 100);
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [updateSpeakingStatus]);

  // Initialize VAD at the top level
  
  // Store mic instance in ref to avoid recreating
  useEffect(() => {
    micRef.current = mic;
  }, [mic]);

  // Start video recording
  const startRecording = useCallback(() => {
    if (!streamRef.current || mediaRecorderRef.current?.state === "recording") return;

    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm;codecs=vp8,opus",
    });

    recordedChunks.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      uploadBlobToServer(blob);
    };

    recorder.start(1000);
    mediaRecorderRef.current = recorder;
  }, []);

  // Upload recorded video
  const uploadBlobToServer = useCallback(async (blob: Blob) => {
    if (!user || !interviewId) return;

    const formData = new FormData();
    formData.append("video", blob, "recording.webm");
    formData.append("userId", user.userId);
    formData.append("interviewId", interviewId);

    try {
      await uploadTranscriptVideo(formData);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }, [user, interviewId]);

  // Initialize media devices
  const initializeMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Set up audio visualization
      const audioCtx = new window.AudioContext();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.fftSize);

      const updateVolume = () => {
        analyser.getByteTimeDomainData(dataArray);
        const normalized = dataArray.map(v => (v - 128) / 128);
        const rms = Math.sqrt(normalized.reduce((sum, val) => sum + val * val, 0) / normalized.length);

        setVolume(Math.min(rms * 100, 100));
        volumeAnimationRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
      startRecording();
    } catch (error) {
      console.error("Error initializing media:", error);
    }
  }, [startRecording]);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Cancel speech synthesis
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      speechSynthesisRef.current = null;
    }
    
    // Stop video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
    
    // Stop recording
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    
    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log(`Stopping ${track.kind} track:`, track.label);
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Close audio context
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (error) {
        console.error("Error closing audio context:", error);
      }
      audioContextRef.current = null;
    }
    
    // Cancel animation frame
    if (volumeAnimationRef.current) {
      cancelAnimationFrame(volumeAnimationRef.current);
      volumeAnimationRef.current = null;
    }

    setVolume(0);
    console.log("Cleanup complete");
  }, []);

  // Handle end call
  const handleEndCall = useCallback(() => {
    cleanup();
    setTimeout(() => {
      navigate("/");
    }, 100);
  }, [cleanup, navigate]);

  // End interview
  const endInterview = useCallback(() => {
    cleanup();
    safeHandleUserResponse("End the interview");
  }, [cleanup, safeHandleUserResponse]);

  // Initialize on mount
  useEffect(() => {
    initializeMedia();
    safeHandleUserResponse("Lets start");
    
    // Cleanup on unmount
    return cleanup;
  }, [initializeMedia, safeHandleUserResponse, cleanup]);

  return (
    <div className="relative w-screen h-screen bg-[#202124] overflow-hidden flex flex-col">
      <div className="bg-[#404040] m-[2%] h-[90%]">
        {/* Volume visualization circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={`rounded-full transition-all duration-100 ease-linear ${
              speakingStatus === INTERVIEW_PROCESSING_STATUS.LISTENING
                ? "bg-green-500"
                : speakingStatus === INTERVIEW_PROCESSING_STATUS.SPEAKING
                ? "bg-blue-500"
                : "bg-purple-500"
            }`}
            style={{
              width: `${100 + volume}px`,
              height: `${100 + volume}px`,
              opacity: 0.9,
              boxShadow: `0 0 ${100 + volume}px ${
                speakingStatus === INTERVIEW_PROCESSING_STATUS.LISTENING
                  ? "rgba(34, 197, 94, 0.6)"
                  : speakingStatus === INTERVIEW_PROCESSING_STATUS.SPEAKING
                  ? "rgba(59, 130, 246, 0.6)"
                  : "rgba(168, 85, 247, 0.6)"
              }`,
            }}
          >
            {STATUS_LABEL_MAP[speakingStatus]}
          </div>
        </div>

        {/* Video preview */}
        <div className="absolute bottom-0 right-0 border border-white rounded-lg overflow-hidden w-64 h-48 shadow-xl">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-2 text-sm text-white bg-black/50 px-2 rounded">
            {user?.name || "User"}
          </div>
          <div className="absolute top-1 left-2 text-xs text-white bg-black/50 px-2 rounded">
            🔴 REC
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-row justify-center items-center m-5 gap-10">
        <Button
          className="!bg-red-500 hover:!bg-red-600 !text-white !border-red-500"
          onClick={endInterview}
          size="large"
        >
          <XOutlined /> End Call
        </Button>
      </div>
    </div>
  );
}