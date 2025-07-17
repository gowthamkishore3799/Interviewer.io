import { XOutlined } from "@ant-design/icons";
import { useMicVAD } from "@ricky0123/vad-react";
import { Button } from "antd";
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleInterviewConversation, uploadTranscriptVideo } from "../api/jobs";
import { INTERVIEW_PROCESSING_STATUS, STATUS_LABEL_MAP } from "../constants";
import { useAuth } from "../context/AuthRouter";

export default function InterviewUI() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(0);
  const location = useLocation();
  const { pathname } = location;
  const interviewId = pathname.split("/")[2];
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const volumeAnimationRef = useRef<number | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isAiSpeakingRef = useRef(false);

  const speakingRef = useRef<INTERVIEW_PROCESSING_STATUS>(INTERVIEW_PROCESSING_STATUS.THINKING);
  const [speakingStatus, setSpeakingStatus] = useState<INTERVIEW_PROCESSING_STATUS>(INTERVIEW_PROCESSING_STATUS.THINKING);

  
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!user) nav("/");
  }, [user]);

  // const speak = useCallback((text: string) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "en-US";
  //   utterance.rate = 1;
  //   utterance.pitch = 1.5;
  //   utterance.volume = 1;

  //   const voices = window.speechSynthesis.getVoices();
  //   utterance.voice = voices.find((v) => v.lang === "en-US") || null;
    

  //   utterance.onstart = () =>{
  //     mic.pause();
  //     console.log("====AI Starting to speak====", mic.listening, mic.userSpeaking)
  //     console.log("====AI Starting to speak====", mic.listening, mic.userSpeaking)
  //     updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.SPEAKING);
  //     isAiSpeakingRef.current= true;
  //     console.log("Utterance started")
  //   } ;
  //   utterance.onend = () => {
  //     console.log("====AI Speech ending====")
  //     mic.start();
  //     updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.LISTENING);
  //     isAiSpeakingRef.current = false;
  //   }

  //   speechSynthesisRef.current = utterance;
  //   window.speechSynthesis.speak(utterance);
  // }, []);

  // function mergeFloat32Arrays(chunks: Float32Array[]): Float32Array {
  //   const totalLength = chunks.reduce((sum, arr) => sum + arr.length, 0);
  //   const result = new Float32Array(totalLength);
  //   let offset = 0;
  //   for (const arr of chunks) {
  //     result.set(arr, offset);
  //     offset += arr.length;
  //   }
  //   return result;
  // }

  const handleUserResponse = useCallback(async (userResponse?: string, base64?: string) => {
    if (!user || !interviewId) return;

    try {
      const response = await handleInterviewConversation(user.userId, interviewId, userResponse, base64);
      if (!response.ok) throw new Error("Interview error");

      const data = await response.json();
      speak(data.conversation.response);

      if(data.conversation.status == "interview_completed"){
        handleEndCall();
      }
    } catch (error) {
      console.error("Interview processing error:", error);
    }
  }, [user, interviewId]);

  const safeHandleUserResponse = (transcript?: string, audioBase64?: string) => {
    updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.THINKING);
    debouncedHandleUserResponse(transcript, audioBase64);
  };

  const debouncedHandleUserResponse = useRef(
    debounce((transcript?: string, audioBase64?: string) => {
      handleUserResponse(transcript, audioBase64);
    }, 2000)
  ).current;

  const updateSpeakingStatus = (status: INTERVIEW_PROCESSING_STATUS) => {
    speakingRef.current = status;
    setSpeakingStatus(status);
  };


// Create a ref to store the mic instance
const micRef = useRef<any>(null);

// Initialize the mic instance only once
useEffect(() => {
  if (!micRef.current) {
    console.log("🎤 Creating single mic instance");
    
    micRef.current = useMicVAD({
      onSpeechStart: () => {
        console.log("Speech detected...");
      },
      onSpeechEnd: async (audioArray: Float32Array) => {
        console.log("Speech end", audioArray);
      },
      onVADMisfire: () => {
        console.log("Misfire of Speech End");
      }
    });
  }
}, []); // Empty dependency array - only run once

// Use the ref in your speak function
const speak = useCallback((text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1.5;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((v) => v.lang === "en-US") || null;
  
  utterance.onstart = () => {
    if (micRef.current) {
      micRef.current.pause();
      console.log("====AI Starting to speak====", micRef.current.listening, micRef.current.userSpeaking);
    }
    updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.SPEAKING);
    isAiSpeakingRef.current = true;
  };
  
  utterance.onend = () => {
    console.log("====AI Speech ending====");
    setTimeout(() => {
      if (micRef.current) {
        try {
          micRef.current.start();
          console.log("VAD restarted successfully");
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
}, []);


  

  // console.log("hook loadded...")
  // const mic = useMicVAD({
  //   // onSpeechStart: () => {
  //   //   console.log("vad speech start", isAiSpeakingRef.current)
  //   //   if (!isAiSpeakingRef.current) {
  //   //     console.log("Listening to user voice...")
  //   //   }
  //   // },
  //   onSpeechStart: () => {
  //     console.log("Speech detectedc...")
  //     console.log(isAiSpeakingRef.current, `${mic.userSpeaking}: User Speaking`, `${mic.listening}: Listening`, "OnSpeech Start...")
  //     // if (!isAiSpeakingRef.current && mic.userSpeaking) {
  //     //   console.log("🎙️ User speaking again, cancel silence timeout");
    
  //     //   updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.LISTENING);
    
  //     //   // Cancel pending response trigger
  //     //   if (silenceTimeoutRef.current) {
  //     //     clearTimeout(silenceTimeoutRef.current);
  //     //     silenceTimeoutRef.current = null;
  //     //   }
  //     // }
  //   },
  //   // onSpeechEnd: async (audioArray: Float32Array) => {
  //   //   console.log("vad speech end", isAiSpeakingRef.current)
  //   //   updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.THINKING);
  //   //   if (!isAiSpeakingRef.current) {
  //   //       console.log("Analysing to user voice...")
  //   //       const wavBuffer = utils.encodeWAV(audioArray)
  //   //       const base64 = utils.arrayBufferToBase64(wavBuffer)
  //   //       const url = `data:audio/wav;base64,${base64}`
  //   //       safeHandleUserResponse("", url);
  //   //   }
  //   // },
  //   onSpeechEnd: async (audioArray: Float32Array) => {
  //     console.log("speech end")
  //     console.log(isAiSpeakingRef.current, `${mic.userSpeaking}: User Speaking`, `${mic.listening}: Listening`, "OnSpeech End...")
  //     // if (!isAiSpeakingRef.current && mic.userSpeaking) {
  //     //   updateSpeakingStatus(INTERVIEW_PROCESSING_STATUS.THINKING);
    
  //     //   console.log("🛑 Speech paused. Saving chunk and waiting 2s...");
    
  //     //   // Append to buffer
  //     //   audioChunksRef.current.push(audioArray);
    
  //     //   // Clear old timeout
  //     //   if (silenceTimeoutRef.current) {
  //     //     clearTimeout(silenceTimeoutRef.current);
  //     //   }
    
  //     //   // Start silence timer
  //     //   silenceTimeoutRef.current = setTimeout(() => {
  //     //     console.log("✅ 2s silence detected. Sending full audio...");
    
  //     //     // Merge audio chunks into one
  //     //     const fullAudio = mergeFloat32Arrays(audioChunksRef.current);
  //     //     const wavBuffer = utils.encodeWAV(fullAudio);
  //     //     const base64 = utils.arrayBufferToBase64(wavBuffer);
    
  //     //     // Send response
  //     //     handleUserResponse("", base64);
    
  //     //     // Reset chunks
  //     //     audioChunksRef.current = [];
  //     //   }, 2000);
  //     // }
  //   },
  //   onVADMisfire: ()=>{
  //     console.log("Misfire of Speech End")
  //   }
  // });

  const startRecording = useCallback(() => {
    if (!streamRef.current || mediaRecorderRef.current?.state === "recording") return;

    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm;codecs=vp8,opus",
    });

    recordedChunks.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    const uploadBlobToServer = async (blob: Blob) => {
      const formData = new FormData();
      formData.append("video", blob, "recording.webm"); // or .mp4/.wav/.mp3
      formData.append("userId", user!?.userId)
      formData.append("interviewId", interviewId)
    
      try {
        await uploadTranscriptVideo(formData);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      uploadBlobToServer(blob)
    };

    recorder.start(1000);
    mediaRecorderRef.current = recorder;

  }, []);


  const cleanup = useCallback(() => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      speechSynthesisRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        console.log(`Stopping ${track.kind} track:`, track.label);
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (error) {
        console.error("Error closing audio context:", error);
      }
      audioContextRef.current = null;
    }
    
    if (volumeAnimationRef.current) {
      cancelAnimationFrame(volumeAnimationRef.current);
      volumeAnimationRef.current = null;
    }

    setVolume(0);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => stream.getTracks().forEach((track) => track.stop()))
      .catch(() => console.log("Camera released"));

      navigator.mediaDevices.enumerateDevices().then((devices)=>{
        console.log("Available devices:", devices);
      })
      
    
    console.log("Cleanup complete");
  }, []);

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

  const handleEndCall = useCallback(() => {
    cleanup();
    setTimeout(() => {
      nav("/");
    }, 100);
  }, [cleanup]);

  const endInterview = function(){
    cleanup();
    safeHandleUserResponse("End the interview");
  }

  useEffect(() => {

    
    initializeMedia();
    safeHandleUserResponse("Lets start");

  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#202124] overflow-hidden flex flex-col">
      <div className="bg-[#404040] m-[2%] h-[90%]">
        {/* Volume circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* <div
            className={`rounded-full transition-all duration-100 ease-linear ${
              isListening
                ? "bg-green-500"
                : isSpeaking
                ? "bg-blue-500"
                : "bg-purple-500"
            }`}
            style={{
              width: `${100 + volume}px`,
              height: `${100 + volume}px`,
              opacity: 0.8,
              boxShadow: `0 0 ${100 + volume}px ${
                isListening
                  ? "rgba(34, 197, 94, 0.6)"
                  : isSpeaking
                  ? "rgba(59, 130, 246, 0.6)"
                  : "rgba(168, 85, 247, 0.6)"
              }`,
            }}
          /> */}
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
              opacity: 0.8,
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
          onClick={() => endInterview()}
          size="large"
        >
          <XOutlined /> End Call
        </Button>
      </div>
    </div>
  );
}