import { Button, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchJobs } from "../../../api/jobs";
import { CANDIDATE_TYPE, JOB_ROLE, JOB_ROLE_TYPE } from "../../../constants";
import { useAuth } from "../../../context/AuthRouter";
import type { JobData } from "../../../interface/job.types";

export function Home(){
    const [jobs, setJobs] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const {user} = useAuth();
    const candidateType = user!.candidateType;
    useEffect(()=>{
      getJobs()
    }, [])

const nav = useNavigate();

const getJobs =  async () => {
    try{
        let query = candidateType == CANDIDATE_TYPE.CANDIDATE? user!.userId : null;
        const response = await fetchJobs(query);
        if(!response.ok){
            throw new Error("Error in fetching jobs")
        }
        const data = await response.json();
        const job = data.jobs
        setJobs(job)
    }catch(e){
      messageApi.error({
        content: "Failed to fetch jobs",
        duration: 3
      })
    }
}


    return (
      <div>
        {contextHolder}
        <div>
          <h3 className="font-display font-bold text-3xl">Listed Jobs</h3>
        </div>
        <div className="flex flex-col">
          {jobs.length > 0 && jobs.map((element: JobData) => (
            <div
              data-jobid={element.jobId}
              className="mt-5 mb-5 border border-gray-100 shadow-xl p-5 rounded-2xl grid grid-cols-[1fr_max-content] gap-10 hover:border-sky-400 border"
              onClick={(e) => {
                nav(`/job/${e.currentTarget.dataset.jobid}`);
              }}
            >
              <div>
                <div>
                  <p className="font-display font-bold text-2xl">
                    {element.title}
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl">{element.orgName}</p>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-4 right">
                <div className="w-full">
                  <Tag
                    color={JOB_ROLE[JOB_ROLE_TYPE.FULL_TIME].color}
                    className="block w-full !text-center"
                  >
                    {element.roleType}
                  </Tag>
                </div>
                <div className="w-full text-center">
                  <Button type="primary" className="w-full" disabled={element?.applied}>
                    {candidateType == CANDIDATE_TYPE.CANDIDATE ? (element?.applied ? "Applied": "Apply") : "View"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}