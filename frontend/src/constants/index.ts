
export const ROOT_URL = "http://localhost:3000"
export const SSO_URL = ROOT_URL + "/v1/sso"
export const userDetailsKey = "USER_DETAILS"
export const JOB_URL = ROOT_URL + "/v1/jobs"
export const INTERVIEW_URL = ROOT_URL + "/v1/interview"
export const RESUME_URL = ROOT_URL + "/resume/"
export const INTERVIEW_TRANSCRIPT = ROOT_URL + "/transcript/"


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
    "add" : "/add",
    "interview": "/interview"
}

export enum CANDIDATE_TYPE{
    RECRUITER = "Recruiter",
    CANDIDATE = "Candidate"
}


export enum INTERVIEW_STATUS {
    INTERVIEW_PENDING = "interview_pending",
    INTERVIEW_COMPLETED = "interview_completed",
    INTERVIEW_PROCESSING = "interview_processing"
}

export const INTERVIEW_STATUS_COLOR_CODES: Record<
  INTERVIEW_STATUS,
  { color: string; label: string }
> = {
  [INTERVIEW_STATUS.INTERVIEW_PENDING]: {
    color: "orange",
    label: "Interview Pending",
  },
  [INTERVIEW_STATUS.INTERVIEW_PROCESSING]: {
    color: "blue",
    label: "Interview Processing",
  },
  [INTERVIEW_STATUS.INTERVIEW_COMPLETED]: {
    color: "green",
    label: "Interview Completed",
  },
};
  

export interface Application{
        _id: string;
        jobId: string;
        userId: string;
        status: INTERVIEW_STATUS;
        title: string;
        roleType: string;
        orgName: string;
}

export enum INTERVIEW_PROCESSING_STATUS{
    THINKING = "thinking",
    SPEAKING = "speaking",
    LISTENING = "listening"
}

export const STATUS_LABEL_MAP: Record<INTERVIEW_PROCESSING_STATUS, string> = {
    [INTERVIEW_PROCESSING_STATUS.THINKING]: "🧠 AI Thinking",
    [INTERVIEW_PROCESSING_STATUS.SPEAKING]: "🤖 AI Speaking",
    [INTERVIEW_PROCESSING_STATUS.LISTENING]: "🎧 User Speaking",
  };