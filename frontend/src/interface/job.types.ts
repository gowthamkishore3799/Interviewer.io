import type { JOB_ROLE_TYPE } from "../constants";

export interface JobData {
    title:string;
    orgName: string;
    qualification: string;
    department: string;
    roleType: JOB_ROLE_TYPE;
    role:string;
    about: string;
    jobId: string;
    applied?: boolean;
}