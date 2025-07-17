export interface message{
    role: ROLE_TYPE,
    content: string | FILE[]
}

interface FILE{
    type: string;
    file_data: string;
    filename: string
}

export enum ROLE_TYPE{
    SYSTEM = "system",
    USER = "user", 
    ASSISTANT = "assistant"
}

export enum FORMAT{
    ATS= "ats",
    INTERVIEW = "interview",
    INTERVIEW_FEEDBACK = "interviewFeedback"
}