import { ResponseInput } from "openai/resources/responses/responses";
import ShortUniqueId from "short-unique-id";
import { LLM } from "../ai/openai";
import INTERVIEW_STATUS from "../constants/applicationStatus";
import { FORMAT, ROLE_TYPE } from "../interface/openAi";
import { ApplicationInfo } from "../models/applications";
import { Interview } from "../models/interview";
import { JobsModel } from "../models/jobModel";
import { interviewPrompt } from "../prompts/interview";
import { interviewFeedbackPrompt } from "../prompts/interviewFeedback";


async function startInterview(jobId: string, userId: string){

    const job = await JobsModel.findJob(jobId);
    const application = await ApplicationInfo.findAppOnJobUserId(jobId, userId)

    const interviewId = new ShortUniqueId({length: 10}).rnd();
    await ApplicationInfo.updateInterview({jobId, userId}, {interviewId, status: INTERVIEW_STATUS.INTERVIEW_PROCESSING})

    if(!job){
        throw new Error("Failed to start Interview")
    }
    let obj: any = {
        resume: application?.parsedResume,
        ...job
    }
    const prompt = interviewPrompt(obj);
    const systemsMessages: ResponseInput = [{
        role: ROLE_TYPE.SYSTEM, 
        content: prompt
    },{
        role: ROLE_TYPE.USER, 
        content: "Lets start"
    }]

    await Interview.createInterview(userId, interviewId, systemsMessages)
    return interviewId;
}

export const processInterviewResult = async (interviewId: string, conversation: ResponseInput) =>{
    const application = await ApplicationInfo.findApplicationByInterviewID(interviewId);

    if(!application){
        throw new Error("Error in finding application")
    }
    const jobInfo = await JobsModel.findJob(application.jobId)


    let prompt = interviewFeedbackPrompt({...application, conversation, ...jobInfo})
    let messages = [{
        role: ROLE_TYPE.SYSTEM,
        content: prompt
    }]
    const feedback = await LLM.generateResponse(messages, FORMAT.INTERVIEW_FEEDBACK)

    await ApplicationInfo.updateInterview({ interviewId }, { conversation, feedback, status: INTERVIEW_STATUS.INTERVIEW_COMPLETED  });
}

export const handleInterview = async (userId: string, interviewId: string, userresponse: string, audioBase64: string) =>{

    let messages = await Interview.getConversation(userId, interviewId);

    if(audioBase64){
        let convo = await LLM.sendToWhisper(audioBase64);
        console.log("Processed Conversation", convo);

        if(!messages || messages.length<=0){
            throw new Error("Failed to conduct interview")
        }
        messages.push({
            role: ROLE_TYPE.USER,
            content: convo.text
        })
    } else{
        if(userresponse.length >0){
            messages.push({
                role: ROLE_TYPE.USER,
                content: userresponse
            })
        }
    }

    const response = await LLM.generateResponse(messages, FORMAT.INTERVIEW);

    messages.push({
        role: ROLE_TYPE.ASSISTANT,
        content: JSON.stringify(response),
    });

    if(response.status == INTERVIEW_STATUS.INTERVIEW_COMPLETED){
        processInterviewResult(interviewId, messages);
    }
    await Interview.createInterview(userId, interviewId, messages)
    return response;
}

export { startInterview };
