import { JOB_URL, ROOT_URL } from "../constants";

export async function createJob(formData:FormData) {
  const requestOptions = {
    method: "POST",
    body: formData
  };
  return await fetch(JOB_URL + "/add", requestOptions);
}

export async function fetchJobs(userId: string| null) {
  const url = new URL(JOB_URL);

  if (userId) {
    url.searchParams.append("userId", userId);
  }

  return await fetch(url, {
    method: "GET",
  });
}

export async function getJobInformation(jobId: string){
    return await fetch(JOB_URL+`/${jobId}`, {
        method: "GET",
    })
}

export async function fetchResume(resumeId: string){
  return await fetch(ROOT_URL + `/${resumeId}`, {
    method: "GET",
  })
}

export async function applyJob(formData: FormData){
  return await fetch(JOB_URL+"/apply", {
        method: "POST",
        body: formData,
  });
}
/**
 * Job description,
 * aling with users Applied right:once click on it
 * 
 * Gowtham Kishore Requires Sponsorship: Yes, Yellow.ai View Resume
 */