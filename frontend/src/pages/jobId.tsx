import type { JobData } from "../interface/job.types";

export function JobInformation({description}: {description: JobData}){
    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-xl">About {description?.orgName}</h1>
            <p>{description?.about}</p>

            <h1 className="font-bold text-xl">Key Responsibilities</h1>
            <p>{description?.role}</p>

            <h1 className="font-bold text-xl">Qualifications</h1>
            <p>{description?.qualification}</p>
        </div>
    )
}