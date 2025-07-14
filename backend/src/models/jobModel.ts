import mongoose, { Model, Schema } from "mongoose";
import { JobData } from "../interface/job";

export class JobsModel {
  private static model: Model<JobData>;

  public static init(): void {
    if (this.model) return;

    const schema = new Schema<JobData>(
      {
        orgName: { type: String, required: true },
        role: { type: String, required: true },
        roleType: { type: String, required: true },
        title: { type: String, required: true },
        qualification: { type: String, required: true },
        department: { type: String, required: true },
        about: { type: String, required: true },
        jobId: { type: String, requireD: true, unique: true },
      },
      { timestamps: true }
    );

    this.model = mongoose.model<JobData>("Job", schema);
  }

  public static async findJobs() {
    const jobs = await JobsModel.model.find().select({orgName: 1, role:1, title: 1, roleType: 1, jobId: 1 }).lean();
    return jobs;
  }


  public static async findJob(jobId:string){
    const jobs = await JobsModel.model.findOne({jobId}).lean();
    return jobs;
  }

  public static async createJob(jobInfo: JobData) {
    const Job = JobsModel.model;
    let job = new Job(jobInfo);
    await job.save();
  }
}