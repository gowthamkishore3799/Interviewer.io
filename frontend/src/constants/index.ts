
export const ROOT_URL = "http://localhost:3000"
export const SSO_URL = ROOT_URL + "/v1/sso"
export const userDetailsKey = "USER_DETAILS"
export const JOB_URL = ROOT_URL + "/v1/jobs"


export enum JOB_ROLE_TYPE {
    FULL_TIME = "Full time",
    PART_TIME = "Part time",
    INTERNSHIP = "Internship"
}

export const JOB_ROLE = {
    [JOB_ROLE_TYPE.FULL_TIME] : {
        color: "green",
        role: JOB_ROLE_TYPE.FULL_TIME
    },
    [JOB_ROLE_TYPE.PART_TIME] : {
        color: "cyan",
        role: JOB_ROLE_TYPE.PART_TIME
    },
    [JOB_ROLE_TYPE.INTERNSHIP] : {
        color: "blue",
        role: JOB_ROLE_TYPE.INTERNSHIP
    }
}

export const ROUTE_PATH: {[key:string]: string} = {
    "home": "/",
    "add" : "/add"
}

export enum CANDIDATE_TYPE{
    RECRUITER = "Recruiter",
    CANDIDATE = "Candidate"
}
