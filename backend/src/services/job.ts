import ShortUniqueId from 'short-unique-id';
import { JobData } from '../interface/job';
import { ApplicationInfo } from '../models/applications';
import { JobsModel } from "../models/jobModel";
import { UserInfo } from '../models/userModel';


async function createJob(job: JobData){
    const jobId = new ShortUniqueId({length: 10}).rnd();
    await JobsModel.createJob({...job, jobId: jobId})
    return jobId
}


async function findJobs(){
    return await JobsModel.findJobs();
}

async function findAppliedJobs(jobs: JobData[], userId: string): Promise<JobData[]> {
    const applications = await ApplicationInfo.findApplicationByUserId(userId)

    const appliedJobIds = new Set(applications.map((a) => a.jobId));
  
    const jobsList = jobs.map((job) => ({
        
      ...job,
      applied: appliedJobIds.has(job.jobId),
    }));

    return jobsList
}

async function getJob(jobId: string){
    return await JobsModel.findJob(jobId);
}

async function createApplication(jobId: string, userId: string, resumeMetadata: string){
    await ApplicationInfo.createApplication({jobId, userId, resumeMetadata})
}

async function findApplication(jobId: string){
    const applications =  await ApplicationInfo.findApplication(jobId)
    const userIds = [];
    for(let application of applications){
        userIds.push(application.userId);
    }


    const application = await UserInfo.findUsers(userIds);
    const jobApplications = application.map((element) => {
        const applied = applications.find((a) => a.userId === element.userId);
        if (applied) {
          return { ...element, resume: applied.resumeMetadata, atsScore: applied.atsScore, status: applied.status, interviewMetaData: applied?.interviewMetaData || "", feedback: applied?.feedback || []};
        }
        return element;
      });
    return jobApplications;
}

async function findInterview(userId:string){
    const applications = await ApplicationInfo.findApplicationByUserIdAndStatus(userId)


    const jobIds = [];
    for(let application of applications){
        jobIds.push(application.jobId)
    }

    const jobs = await JobsModel.findJobsByIds(jobIds)

    const response = applications.map((element)=>{
        const applied = jobs.find((job) => job.jobId === element.jobId);
        if (applied) {
          return { ...element, title: applied.title, roleType: applied.roleType, orgName: applied.orgName };
        }
        return element;
    })
    return response;
}

export { createApplication, createJob, findApplication, findAppliedJobs, findInterview, findJobs, getJob };

