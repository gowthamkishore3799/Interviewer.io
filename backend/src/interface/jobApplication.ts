export interface jobApplication{
    jobId: string;
    userId: string;
    resumeMetadata: string;
    status?: string;
    atsScore?: KeyValue;
    parsedResume?: KeyValue;
    conversation?: KeyValue[];
    feedback?: KeyValue;
    interviewId?: string;
    interviewMetaData?: string;
}

interface KeyValue{
    [key: string]: string
}