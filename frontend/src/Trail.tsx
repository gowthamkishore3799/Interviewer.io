// import { useEffect, useRef, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// // import { XOutlined } from "@ant-design/icons";
// // import { Button } from "antd";
// // import { useEffect, useRef, useState } from "react";
// // import { useLocation, useNavigate } from "react-router";
// // import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// // import { handleInterviewConversation } from "../api/jobs";
// // import { useAuth } from "../context/AuthRouter";

import { useMicVAD } from "@ricky0123/vad-react";
import { Button } from "antd";

// // export default function InterviewUI() {
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const [volume, setVolume] = useState(0);
// //   const [interviewId, setInterviewId] = useState("");
// //   const { transcript, listening, resetTranscript } = useSpeechRecognition();
// //   const VOLUME_THRESHOLD = 80;

// //   const audioContextRef = useRef<AudioContext | null>(null);
// //   const lastTranscriptRef = useRef("");
// //   const [isRecording, setIsRecording] = useState(false);
// //   const silenceTimer = useRef<NodeJS.Timeout | null>(null);
// //   const recordedChunks = useRef<Blob[]>([]);
// //   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
// //   const { user } = useAuth();
// //   const nav = useNavigate();
// //   const location = useLocation();




// //   if(!user){
// //     nav("/")
// //   }

// //   const speak = (text: string) => {
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = "en-US";
// //     utterance.rate = 1;
// //     utterance.pitch = 1.5;
// //     utterance.volume = 1;

// //     const voices = window.speechSynthesis.getVoices();
// //     utterance.voice = voices.find((v) => v.lang === "en-US") || null;

// //     window.speechSynthesis.speak(utterance);

// //   };

// //   const stopRecording = () => {
// //     SpeechRecognition.stopListening();
// //     setIsRecording(false);
  
// //     // Stop media tracks
// //     if (videoRef.current && videoRef.current.srcObject) {
// //       const mediaStream = videoRef.current.srcObject as MediaStream;
// //       mediaStream.getTracks().forEach((track) => {
// //         console.log(track, "Track..")
// //         track.stop();
// //       });
// //       videoRef.current.srcObject = null;
// //     }
  
// //     // Close audio context if active
// //     if (audioContextRef.current && audioContextRef.current.state !== "closed") {
// //       audioContextRef.current.close().catch((err) =>
// //         console.error("Error closing audio context:", err)
// //       );
// //     }
  
// //     // Stop MediaRecorder if active
// //     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
// //       mediaRecorderRef.current.stop();
// //     }
// //   };
  

// //   const init = async () => {
// //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //     if (videoRef.current) videoRef.current.srcObject = stream;

// //     const combinedStream = new MediaStream([
// //       ...stream.getAudioTracks(),
// //       ...stream.getVideoTracks(),
// //     ]);

// //     const recorder = new MediaRecorder(combinedStream, {
// //       mimeType: "video/webm;codecs=vp8,opus",
// //     });

// //     recordedChunks.current = [];

// //     recorder.ondataavailable = (e) => {
// //       if (e.data.size > 0) {
// //         recordedChunks.current.push(e.data);
// //       }
// //     };

// //     recorder.onstop = () => {
// //       const blob = new Blob(recordedChunks.current, { type: "video/webm" });
// //       console.log("Final blob size:", blob.size);

// //       const url = URL.createObjectURL(blob);
// //       nav("/")
// //     }

// //     recorder.start(1000);
// //     mediaRecorderRef.current = recorder;

// //     audioContextRef.current = new window.AudioContext();
// //     const source = audioContextRef.current.createMediaStreamSource(stream);
// //     const analyser = audioContextRef.current.createAnalyser();

// //     const filter = audioContextRef.current.createBiquadFilter();
// // filter.type = "bandpass";
// // filter.frequency.value = 1000; // center frequency

// // source.connect(filter);
// // filter.connect(analyser);

// //     source.connect(analyser);
// //     analyser.fftSize = 2048;
// //     const dataArray = new Uint8Array(analyser.fftSize);

// //     const getVolume = () => {
// //       // analyser.getByteFrequencyData(dataArray);
// //       // const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
// //       // setVolume(Math.min(average / 2, 100));
// //       // requestAnimationFrame(getVolume);

// //       analyser.getByteTimeDomainData(dataArray);
// //   const normalized = dataArray.map(v => (v - 128) / 128); // Convert to range -1 to 1
// //   const rms = Math.sqrt(normalized.reduce((sum, val) => sum + val * val, 0) / normalized.length);

// //   setVolume(Math.min(rms * 100, 100)); // scale for display
// //   requestAnimationFrame(getVolume);

// //     };

// //     const detect = () => {
// //       analyser.getByteFrequencyData(dataArray);
// //       const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
// //       setVolume(avg);

// //       console.log(avg, VOLUME_THRESHOLD)
// //       if (avg > VOLUME_THRESHOLD && !listening && !isRecording) {
// //         console.log(avg, VOLUME_THRESHOLD, listening, isRecording)
// //         // resetTranscript();
// //         setIsRecording(true);
// //         SpeechRecognition.startListening();
// //       }
// //       requestAnimationFrame(detect);
// //     };

// //     detect();
// //     getVolume();
// //   };

// //   useEffect(() => {

// //     const {pathname} = location;

// //     let interviewRoomNo = pathname.split("/")[2];
// //     setInterviewId(interviewRoomNo);
    

// //     init();

// //     const handleUserResponse = async (userResponse?: string)=>{
// //       try{
// //         const response = await handleInterviewConversation(user!.userId, interviewRoomNo, userResponse)

// //         if(!response.ok){
// //           throw new Error("Error in conducting interview");
// //         }
// //         const data = await response.json();
// //         speak(data.conversation.question)
// //       } catch(e){
// //         console.log(e, "error in interview")

// //       }
     


// //     }

// //     handleUserResponse()
// //   }, []);

// //   useEffect(() => {
// //     console.log(transcript, "Transcript///")
// //     if (transcript !== lastTranscriptRef.current) {
// //       lastTranscriptRef.current = transcript;
// //       if (silenceTimer.current) clearTimeout(silenceTimer.current);

// //       silenceTimer.current = setTimeout(() => {
// //         console.log("Silence detected. Stopping listening.");
// //         resetTranscript();
// //         setIsRecording(false);
// //         SpeechRecognition.stopListening();
// //       }, 3000);
// //     }
// //   }, [transcript, listening]);

// //   return (
// //     <div className="relative w-screen h-screen bg-[#202124] overflow-hidden flex flex-col">
// //       <div className="bg-[#404040] m-[2%] h-[90%]">
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
// //           <div
// //             className="rounded-full bg-purple-500 transition-all duration-100 ease-linear"
// //             style={{
// //               width: `${100 + volume}px`,
// //               height: `${100 + volume}px`,
// //               opacity: 0.8,
// //               boxShadow: `0 0 ${10 * volume}px rgba(168, 85, 247, 0.6)`,
// //             }}
// //           />
// //         </div>
// //         <div className="absolute bottom-0 right-0 border border-white rounded-lg overflow-hidden w-64 h-48 shadow-xl">
// //           <video
// //             ref={videoRef}
// //             autoPlay
// //             muted
// //             playsInline
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute bottom-1 right-2 text-sm text-white bg-black/50 px-2 rounded">
// //             {user?.name || "User"}
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex flex-row justify-center items-center m-5 gap-10">
// //         <div className="basis-[2/3] grow flex justify-center items-center">
// //           <Button className="!bg-red-300 hover:color-red-300" onClick={stopRecording}>
// //             <XOutlined /> End Call
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { XOutlined } from "@ant-design/icons";
// import { MicVAD } from "@ricky0123/vad-web";
// import { Button } from "antd";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import { handleInterviewConversation } from "../api/jobs";
// import { SimpleWhisperConverter } from "../api/whisper"; // Your whisper converter
// import { useAuth } from "../context/AuthRouter";
// import { useMicVAD } from "@ricky0123/vad-react";

// export default function InterviewUI() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [volume, setVolume] = useState(0);
//   const [interviewId, setInterviewId] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
  
//   // Audio/Video recording refs
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const recordedChunks = useRef<Blob[]>([]);
//   const streamRef = useRef<MediaStream | null>(null);
  
//   // VAD and speech refs
//   const vadRef = useRef<MicVAD | null>(null);
//   const whisperRef = useRef<SimpleWhisperConverter | null>(null);
//   const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
//   // Cleanup and navigation
//   const { user } = useAuth();
//   const nav = useNavigate();
//   const location = useLocation();
//   const isComponentMounted = useRef(true);

//   // Initialize Whisper converter
//   useEffect(() => {
//     whisperRef.current = new SimpleWhisperConverter(process.env.REACT_APP_OPENAI_API_KEY!);
//   }, []);

//   // Navigation guard
//   useEffect(() => {
//     if (!user) {
//       nav("/");
//     }
//   }, [user, nav]);

//   // Cleanup on unmount or navigation
//   useEffect(() => {
//     return () => {
//       isComponentMounted.current = false;
//       cleanup();
//     };
//   }, []);

//   // Handle page visibility changes
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         stopSpeaking();
//         pauseRecording();
//       } else {
//         resumeRecording();
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   // Handle beforeunload
//   useEffect(() => {
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       e.preventDefault();
//       cleanup();
//       return "Are you sure you want to leave the interview?";
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, []);

//   const cleanup = useCallback(() => {
//     stopSpeaking();
//     stopRecording();
    
//     // Clean up VAD
//     if (vadRef.current) {
//       vadRef.current.destroy();
//       vadRef.current = null;
//     }
    
//     // Clean up media stream
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
    
//     // Clean up audio context
//     if (audioContextRef.current && audioContextRef.current.state !== "closed") {
//       audioContextRef.current.close().catch(console.error);
//     }
    
//     // Clean up video
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//   }, []);

//   const speak = useCallback((text: string) => {
//     if (!isComponentMounted.current || document.hidden) return;
    
//     stopSpeaking(); // Stop any ongoing speech
    
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     utterance.rate = 1;
//     utterance.pitch = 1.5;
//     utterance.volume = 1;

//     const voices = window.speechSynthesis.getVoices();
//     utterance.voice = voices.find((v) => v.lang === "en-US") || null;

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = () => setIsSpeaking(false);

//     speechSynthesisRef.current = utterance;
//     window.speechSynthesis.speak(utterance);
//   }, []);

//   const stopSpeaking = useCallback(() => {
//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel();
//     }
//     setIsSpeaking(false);
//     speechSynthesisRef.current = null;
//   }, []);

//   const handleUserResponse = useCallback(async (userResponse?: string) => {
//     if (!isComponentMounted.current || !user) return;
    
//     try {
//       const response = await handleInterviewConversation(user.userId, interviewId, userResponse);
      
//       if (!response.ok) {
//         throw new Error("Error in conducting interview");
//       }
      
//       const data = await response.json();
//       if (isComponentMounted.current) {
//         speak(data.conversation.question);
//       }
//     } catch (error) {
//       console.error("Error in interview:", error);
//       // Handle error appropriately - maybe show a notification
//     }
//   }, [user, interviewId, speak]);

//   const startRecording = useCallback(() => {
//     if (!streamRef.current || mediaRecorderRef.current?.state === "recording") return;
    
//     const recorder = new MediaRecorder(streamRef.current, {
//       mimeType: "video/webm;codecs=vp8,opus",
//     });

//     recordedChunks.current = [];

//     recorder.ondataavailable = (e) => {
//       if (e.data.size > 0) {
//         recordedChunks.current.push(e.data);
//       }
//     };

//     recorder.onstop = () => {
//       const blob = new Blob(recordedChunks.current, { type: "video/webm" });
//       console.log("Final recording blob size:", blob.size);
      
//       // TODO: Upload the blob to your server
//       // uploadRecording(blob, interviewId);
      
//       const url = URL.createObjectURL(blob);
//       // You can save this URL or handle the blob as needed
//     };

//     recorder.start(1000);
//     mediaRecorderRef.current = recorder;
//     setIsRecording(true);
//   }, []);

//   const stopRecording = useCallback(() => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
//       mediaRecorderRef.current.stop();
//     }
//     setIsRecording(false);
//   }, []);

//   const pauseRecording = useCallback(() => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
//       mediaRecorderRef.current.pause();
//     }
//   }, []);

//   const resumeRecording = useCallback(() => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
//       mediaRecorderRef.current.resume();
//     }
//   }, []);

//   const initializeMedia = useCallback(async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: true, 
//         audio: { 
//           echoCancellation: true,
//           noiseSuppression: true,
//           autoGainControl: true,
//           sampleRate: 16000
//         } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
      
//       streamRef.current = stream;
      
//       // Initialize audio context for volume visualization
//       audioContextRef.current = new window.AudioContext();
//       const source = audioContextRef.current.createMediaStreamSource(stream);
//       const analyser = audioContextRef.current.createAnalyser();
      
//       source.connect(analyser);
//       analyser.fftSize = 2048;
//       const dataArray = new Uint8Array(analyser.fftSize);

//       const updateVolume = () => {
//         if (!isComponentMounted.current) return;
        
//         analyser.getByteTimeDomainData(dataArray);
//         const normalized = dataArray.map(v => (v - 128) / 128);
//         const rms = Math.sqrt(normalized.reduce((sum, val) => sum + val * val, 0) / normalized.length);
        
//         setVolume(Math.min(rms * 100, 100));
//         requestAnimationFrame(updateVolume);
//       };
      
//       updateVolume();
      
//       // Initialize VAD
//       vadRef.current = useMicVAD({
//         stream,
//         onSpeechStart: () => {
//           if (!isSpeaking && isComponentMounted.current) {
//             console.log('Speech started');
//             setIsListening(true);
//           }
//         },
//         onSpeechEnd: async (audioArray: Float32Array) => {
//           if (!isSpeaking && isComponentMounted.current && whisperRef.current) {
//             console.log('Speech ended, processing...');
//             setIsListening(false);
            
//             try {
//               const text = await whisperRef.current.convertToText(audioArray);
//               console.log('Transcription:', text);
              
//               if (text.trim()) {
//                 await handleUserResponse(text);
//               }
//             } catch (error) {
//               console.error('Transcription failed:', error);
//             }
//           }
//         },
//         onVADMisfire: () => {
//           console.log('VAD misfire');
//           setIsListening(false);
//         }
//       });
      
//       // Start recording
//       startRecording();
      
//     } catch (error) {
//       console.error('Error initializing media:', error);
//       // Handle permission denied or other errors
//     }
//   }, [isSpeaking, handleUserResponse, startRecording]);

//   const handleEndCall = useCallback(() => {
//     stopRecording();
//     cleanup();
//     nav("/");
//   }, [stopRecording, cleanup, nav]);

//   // Initialize everything
//   useEffect(() => {
//     const { pathname } = location;
//     const interviewRoomNo = pathname.split("/")[2];
//     setInterviewId(interviewRoomNo);
    
//     initializeMedia();
    
//     // Start the interview
//     setTimeout(() => {
//       if (isComponentMounted.current) {
//         handleUserResponse();
//       }
//     }, 1000);
//   }, [location, initializeMedia, handleUserResponse]);

//   return (
//     <div className="relative w-screen h-screen bg-[#202124] overflow-hidden flex flex-col">
//       <div className="bg-[#404040] m-[2%] h-[90%]">
//         {/* Volume visualization */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div
//             className={`rounded-full transition-all duration-100 ease-linear ${
//               isListening ? 'bg-green-500' : isSpeaking ? 'bg-blue-500' : 'bg-purple-500'
//             }`}
//             style={{
//               width: `${100 + volume}px`,
//               height: `${100 + volume}px`,
//               opacity: 0.8,
//               boxShadow: `0 0 ${10 + volume}px ${
//                 isListening ? 'rgba(34, 197, 94, 0.6)' : 
//                 isSpeaking ? 'rgba(59, 130, 246, 0.6)' : 
//                 'rgba(168, 85, 247, 0.6)'
//               }`,
//             }}
//           />
//         </div>
        
//         {/* Video preview */}
//         <div className="absolute bottom-0 right-0 border border-white rounded-lg overflow-hidden w-64 h-48 shadow-xl">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-1 right-2 text-sm text-white bg-black/50 px-2 rounded">
//             {user?.name || "User"}
//           </div>
//           <div className="absolute top-1 left-2 text-xs text-white bg-black/50 px-2 rounded">
//             {isRecording ? '🔴 REC' : '⏸️ PAUSED'}
//           </div>
//         </div>
        
//         {/* Status indicators */}
//         <div className="absolute top-4 left-4 flex flex-col gap-2">
//           {isSpeaking && (
//             <div className="bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm">
//               🎙️ AI Speaking
//             </div>
//           )}
//           {isListening && (
//             <div className="bg-green-500/80 text-white px-3 py-1 rounded-full text-sm">
//               👂 Listening
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Controls */}
//       <div className="flex flex-row justify-center items-center m-5 gap-10">
//         <div className="basis-[2/3] grow flex justify-center items-center">
//           <Button 
//             className="!bg-red-500 hover:!bg-red-600 !text-white !border-red-500" 
//             onClick={handleEndCall}
//             size="large"
//           >
//             <XOutlined /> End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { SimpleWhisperConverter } from "./api/whisper";

// const AUTO_STOP_DELAY = 3000; // Stop if no new speech for 5 seconds

// export default function VoiceInput() {
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();
//   const [display, setDisplay] = useState("");
//   const lastTranscriptRef = useRef("");
//   const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // Start listening
//   const start = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, language: "en-US" });
//   };

//   // Stop listening
//   const stop = () => {
//     SpeechRecognition.stopListening();
//     if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
//   };

//   // Monitor silence
//   useEffect(() => {
//     if (!listening) return;

//     if (transcript !== lastTranscriptRef.current) {
//       lastTranscriptRef.current = transcript;

//       // Reset silence timer
//       if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

//       silenceTimerRef.current = setTimeout(() => {
//         console.log("Auto-stopping due to silence...");
//         setDisplay(transcript);
//         stop();
//       }, AUTO_STOP_DELAY);
//     }
//   }, [transcript, listening]);

//   return (
//     <div className="p-6 flex flex-col gap-4">
//       <h2 className="text-xl font-semibold">Speech-to-Text</h2>
//       <div className="flex gap-3">
//         <button
//           onClick={start}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Start Listening
//         </button>
//         <button
//           onClick={stop}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Stop
//         </button>
//       </div>

//       <div className="text-sm text-gray-700 bg-white p-3 rounded shadow">
//         <strong>Live Transcript:</strong> {transcript}
//       </div>
//       <div className="text-sm text-gray-500">
//         <strong>Final Output:</strong> {display}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// const VOLUME_THRESHOLD = 20; // Tune this value based on environment

// export default function AutoVoiceToText() {
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();
//   const [finalText, setFinalText] = useState("");
//   const [volume, setVolume] = useState(0);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const silenceTimer = useRef<NodeJS.Timeout | null>(null);
//   const lastTranscriptRef = useRef("");

//   useEffect(() => {
//     const initAudio = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
//       const source = audioContextRef.current.createMediaStreamSource(stream);
//       const analyser = audioContextRef.current.createAnalyser();

//       source.connect(analyser);
//       analyser.fftSize = 128;

//       const dataArray = new Uint8Array(analyser.frequencyBinCount);

//       const detect = () => {
//         analyser.getByteFrequencyData(dataArray);
//         const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
//         setVolume(avg);
//         console.log(avg, listening)
//         if (avg > VOLUME_THRESHOLD && !listening) {
//           console.log("Sound detected: Starting listening");
//           resetTranscript();
//           SpeechRecognition.startListening({ continuous: true, listening: true });
//         }

//         requestAnimationFrame(detect);
//       };

//       detect();
//     };

//     initAudio();
//   }, []);

//   // Stop listening if silence after speech
//   useEffect(() => {
//     console.log(transcript, lastTranscriptRef.current, "TRanscript....")
//     if (!listening) return;

//     if (transcript !== lastTranscriptRef.current) {
//         console.log(transcript, "TRanscripst..")
//       lastTranscriptRef.current = transcript;
//       if (silenceTimer.current) clearTimeout(silenceTimer.current);

//       silenceTimer.current = setTimeout(() => {
//         console.log("Silence detected. Stopping listening.");
//         setFinalText(transcript);
//         SpeechRecognition.stopListening();
//       }, 3000); // Stop after 3s of silence
//     }
//   }, [transcript, listening]);

//   return (
//     <div className="p-6 flex flex-col gap-4">
//       <h2 className="text-xl font-semibold">Auto Start Voice Input</h2>

//       <div className="text-sm bg-white p-3 rounded shadow">
//         <strong>Live:</strong> {transcript}
//       </div>
//       <div className="text-sm text-gray-600">
//         <strong>Final:</strong> {finalText}
//       </div>
//       <div className="text-xs text-gray-400">Mic Volume: {Math.round(volume)}</div>
//     </div>
//   );
// }

export default function TrailBox(){
   
    //   useEffect(() => {
    //         const initAudio = async () => {
    //           const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //           audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    //           const source = audioContextRef.current.createMediaStreamSource(stream);
    //           const analyser = audioContextRef.current.createAnalyser();
        
    //           source.connect(analyser);
    //           analyser.fftSize = 128;
        
    //           const dataArray = new Uint8Array(analyser.frequencyBinCount);
    //           console.log(dataArray, "ARRay.")
        
    //           const detect = () => {
    //             analyser.getByteFrequencyData(dataArray);
    //             const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
    //             setVolume(avg);
    //             console.log(avg, listening)
    //             if (avg > VOLUME_THRESHOLD && !listening && !isRecording) {
    //               console.log("Sound detected: Starting listening");
    //               resetTranscript();
    //               setIsRecording(true)
    //               SpeechRecognition.startListening({ continuous: true, listening: true });
    //             }
        
    //             requestAnimationFrame(detect);
    //           };
        
    //           detect();
    //         };
        
    //         initAudio();
    //       }, []);

    //       useEffect(() => {
    //             console.log(transcript, lastTranscriptRef.current, "TRanscript....")
    //             // if (!listening) return;
            
    //             if (transcript !== lastTranscriptRef.current) {
    //                 console.log(transcript, "TRanscripst..")
    //               lastTranscriptRef.current = transcript;
    //               if (silenceTimer.current) clearTimeout(silenceTimer.current);
            
    //               silenceTimer.current = setTimeout(() => {
    //                 console.log("Silence detected. Stopping listening.");
    //                 // setFinalText(transcript);
    //                 resetTranscript()
    //                 setIsRecording(false)
    //                 SpeechRecognition.stopListening();
    //               }, 3000); // Stop after 3s of silence
    //             }
    //           }, [transcript, listening]);
    //       console.log(transcript, "Code....")



  //   const vad = useMicVAD({
  //     startOnLoad: true,
  //     onSpeechEnd: async (audioBuffer) => {
  //       // setLoading(true);
  //       const whisper = new SimpleWhisperConverter();
  //       const text = await whisper.convertToText(audioBuffer);
  //       console.log(text, "TEXt")
  //     },
  //   });
  
  //   console.log(vad.userSpeaking, vad.listening)

  const handleClick = async ()=>{
    await vad.pause();
    speak("hi gowthjam whats the input you can think of")
  }

  const handleUnPause =() =>{
    vad.start();
  }
const vad = useMicVAD({
    onSpeechEnd: (audio) => {
    console.log("User stopped talking")
    },


})
const speak = (text: string) => {
  const synth = window.speechSynthesis;

  const startSpeaking = () => {
    const voices = synth.getVoices();
    console.log(voices, "Loaded Voices");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Prefer Google US English if available
    utterance.voice =
      voices.find(v => v.name === "Samantha") ||
      // voices.find(v => v.name.includes("Google") && v.lang === "en-US") ||
      // voices.find(v => v.lang === "en-US") || null;
      console.log(voices, "Voices")

    utterance.onstart = () => {
      console.log("Speech started");
    };

    utterance.onend = () => {
      console.log("Speech ended");
    };

    synth.speak(utterance);
  };

  // Check if voices are already loaded
  if (synth.getVoices().length === 0) {
    console.log("Waiting for voices...");
    synth.onvoiceschanged = () => {
      startSpeaking();
    };
  } else {
    startSpeaking();
  }
};
return (
<>
<div>{vad.userSpeaking && "User is speaking"}</div>
<Button onClick={handleClick}>Puases</Button>
<Button onClick={handleUnPause}>Unpause</Button>
</>)
}

  // return <div>Listening for voice activity...</div>;
// 
