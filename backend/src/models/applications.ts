import mongoose, { Model, Schema } from "mongoose";
import { jobApplication } from "../interface/jobApplication";

export class ApplicationInfo {
    private static model: Model<jobApplication>;

    public static init(): void {
        if (this.model) return;

        const schema = new Schema<jobApplication>(
            {
                jobId: {type: String, required: true},
                userId: {type: String, required: true},
                resumeMetadata: {type: String, required: true}
            },
            { timestamps: true }
        );

        this.model = mongoose.model<jobApplication>('job_application', schema);
    }

    public static async findApplication(jobId: string){
        const application = await ApplicationInfo.model.find({jobId}).lean()
        return application;
    }


    public static async findApplicationByUserId(userId: string){
        const application = await ApplicationInfo.model.find({userId}).lean().exec()
        return application;
    }


    public static async createApplication({jobId, userId, resumeMetadata}: jobApplication){
        const application = ApplicationInfo.model;

        await application.findOneAndUpdate({jobId, userId}, { resumeMetadata}, {
            new: true,
            upsert: true
        });
    }
}

