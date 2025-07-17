import mongoose, { Model, Schema } from "mongoose";

import INTERVIEW_STATUS from "../constants/applicationStatus";
import { jobApplication } from "../interface/jobApplication";

export class ApplicationInfo {
    private static model: Model<jobApplication>;

    public static init(): void {
        if (this.model) return;

        const schema = new Schema<jobApplication>(
            {
                jobId: {type: String, required: true},
                userId: {type: String, required: true},
                interviewId: {type: String},
                resumeMetadata: {type: String, required: true},
                status: {type:String},
                atsScore: {type: Object},
                parsedResume: {type: Object},
                conversation: {type: Object},
                feedback: {type: Object},
                interviewMetaData: {type: Object},            },
            { timestamps: true }
        );

        this.model = mongoose.model<jobApplication>('job_application', schema);
    }

    public static async findApplication(jobId: string){
        const application = await ApplicationInfo.model.find({jobId}).lean()
        return application;
    }

    public static async findApplicationByUserIdAndStatus(userId: string){
        const application = await ApplicationInfo.model.find({userId}).select({userId: 1, jobId: 1, status: 1}).lean().exec()
        return application;
    }


    public static async findApplicationByUserId(userId: string){
        const application = await ApplicationInfo.model.find({userId}).lean().exec()
        return application;
    }

    public static async findAppOnJobUserId(jobId: string, userId: string){
        const application = await ApplicationInfo.model.findOne({userId, jobId}).select({ parsedResume: 1 }).lean().exec()
        return application;
    }


    public static async createApplication({jobId, userId, resumeMetadata}: jobApplication){

        await ApplicationInfo.model.findOneAndUpdate({jobId, userId}, { resumeMetadata, status: INTERVIEW_STATUS.INTERVIEW_PENDING}, {
            new: true,
            upsert: true
        });
    }

    public static async updateApplication(jobId: string, userId: string, response: {[key:string]: string}){

        await ApplicationInfo.model.findOneAndUpdate({jobId, userId},{ $set: { 
            atsScore: response.ats_analysis, 
            parsedResume: response.parsed_resume,
          } }, {
            new: true,
            upsert: true
        });
    }

    public static async updateInterview(query: {[key: string]: string}, update: {[key: string]: any}){
        await ApplicationInfo.model.findOneAndUpdate(query,{ $set: {...update}}, {
            new: true,
            upsert: true
        });
    }

    public static async findApplicationByInterviewID(interviewId: string){
        return await ApplicationInfo.model.findOne({interviewId}).select({parsedResume: 1, jobId: 1, userId: 1});
    }
}

