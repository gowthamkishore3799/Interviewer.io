import fs from 'fs';
import { ResponseInput } from 'openai/resources/responses/responses';
import { LLM } from '../ai/openai';
import { FORMAT, ROLE_TYPE } from '../interface/openAi';
import { ApplicationInfo } from '../models/applications';
import { atsScorePrompt } from '../prompts/atsScore';
import { getJob } from './job';

function generateBase64Resume(filePath: string){
    const base64Encoded = fs.readFileSync(filePath, { encoding: 'base64' });
    return base64Encoded

}

async function prepareAtsScore( jobId: string, userId: string, filePath: string){
    const jobInformation = await getJob(jobId);

    if(!jobInformation){
        throw new Error("Error in find job");
    }

    const base64String = generateBase64Resume(filePath)
    const systemsMessages: ResponseInput = [{
        role: ROLE_TYPE.SYSTEM, 
        content: atsScorePrompt(jobInformation)
    },{
        role: ROLE_TYPE.USER,
        content: [
            {
                type: "input_file",
                filename: "resume.pdf",
                file_data: `data:application/pdf;base64,${base64String}`,
            },
        ]
    }]


    const response = await LLM.generateResponse(systemsMessages, FORMAT.ATS);

    if(!response){
        throw new Error("Error in Generating score")
    }

    await ApplicationInfo.updateApplication(jobId, userId, response)
    console.log("Application updated.....")

}



export { prepareAtsScore };

