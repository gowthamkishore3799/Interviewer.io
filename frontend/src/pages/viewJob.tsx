import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getJobInformation } from "../api/jobs";
import { GlobalLoader } from "../components/LoadingPage";
import { getUserDetails } from "../components/sessionStorage";
import { CANDIDATE_TYPE } from "../constants";
import { useAuth } from "../context/AuthRouter";
import type { Application } from "../interface/application.types";
import type { JobData } from "../interface/job.types";
import ResumeUploader from "./candidate/createApplications";
import { JobInformation } from "./jobId";
import JobApplications from "./recruiter/viewApplications";

export default function ViewJob(){


    const jobId = useParams().jobId;
    const [applications, setapplication] = useState<Application[] |null>(null);
    const [jobInfo, setJobInformation] = useState<JobData| null>(null);
    const [loading, setIsLoading] = useState(true)

    const {user}=useAuth();

    useEffect(()=>{
        async function getJobId(){

            if(!jobId){
                return;
            }
            try{
                const response = await getJobInformation(jobId);
                if(!response.ok){
                    throw new Error("Error in getting job information");
                }

                const { application, job }: { application: any; job: JobData } = await response.json();

                setapplication(application);
                setJobInformation(job)
                setIsLoading(false);
            } catch(e){
                console.log(e, 'Error in Getting job information')
            }
        }

        getJobId()
    },[])

   if (loading || !jobInfo || !applications || !jobId) return <GlobalLoader />;

    const items =[{
        label: "Overview",
        key: "overview",
        children: <JobInformation description={jobInfo}/>
    }]

    const isRecruiter = getUserDetails()?.candidateType == CANDIDATE_TYPE.RECRUITER;

    if(isRecruiter){
        items.push({
            label: "Applications",
            key: "Applications",
            children: <JobApplications applications={applications} />
        })
    } else{

      if (!applications || applications.length <= 0) {
        items.push({
          label: "Apply",
          key: "Apply",
          children: <ResumeUploader jobId={jobId} userId={user!.userId} />,
        });
      }
      
    }
    
    return (
      <div>
        <h1 className="font-bold text-2xl">{jobInfo?.title}</h1>
        <div className="flex flex-row m-10 gap-15">
          <div className="flex-col flex m-10 basis-1/10 gap-5">
            <div>
            <p className="text-sm">Employment Type</p>
            <p className="text-base">{jobInfo?.roleType}</p>
            </div>
            <hr/>
            <div>
            <p className="text-sm">Department</p>
            <p className="text-base">{jobInfo?.department}</p>
            </div>
          </div>
          <div className="basis-9/10">
            <Tabs defaultActiveKey="overview" items={items} />
          </div>
        </div>
      </div>
    );
}


