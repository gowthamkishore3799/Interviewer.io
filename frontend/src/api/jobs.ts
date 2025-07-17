import { INTERVIEW_URL, JOB_URL, ROOT_URL } from "../constants";

export async function createJob(formData:FormData) {
  return await fetch(JOB_URL + "/add", {
    method: "POST",
    body: formData,
    credentials: "include"
  });
}

export async function fetchJobs(userId: string| null) {
  const url = new URL(JOB_URL);

  if (userId) {
    url.searchParams.append("userId", userId);
  }

  return await fetch(url, {
    method: "GET",
    credentials: "include"
  });
}

export async function getJobInformation(jobId: string){
    return await fetch(JOB_URL+`/${jobId}`, {
        method: "GET",
        credentials: "include"
    })
}

export async function fetchResume(resumeId: string){
  return await fetch(ROOT_URL + `/resume/${resumeId}`, {
    method: "GET",
  })
}

export async function applyJob(formData: FormData){
  return await fetch(JOB_URL+"/apply", {
        method: "POST",
        body: formData,
        credentials: "include"
  });
}


export async function findAppliedJobs(userId: string){
  return await fetch(JOB_URL+`/user/${userId}`, {
    method: "GET",
    credentials: "include"
  })
}

export async function createInterviewId(jobId: string, userId: string) {
  return await fetch(INTERVIEW_URL+"/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({userId, jobId}),
    credentials: "include"
  })
}

export async function handleInterviewConversation(userId: string, interviewId: string, userResponse?: string, audioBase64?:string) {
  return await fetch(INTERVIEW_URL+"/conversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({userId, interviewId, userResponse, audioBase64}),
    credentials: "include"
  })
}

export async function uploadTranscriptVideo(formData: FormData){
  return await fetch(INTERVIEW_URL+"/transcripts", {
    method: "POST",
    body:formData,
    credentials: "include"
  })
}
export async function getRecording(transcriptId: string){
  return await fetch (ROOT_URL + `/transcript/${transcriptId}`,{
    method: "GET",
    credentials: "include"
  })
}
/**
 * Job description,
 * aling with users Applied right:once click on it
 * 
 * Gowtham Kishore Requires Sponsorship: Yes, Yellow.ai View Resume
 */