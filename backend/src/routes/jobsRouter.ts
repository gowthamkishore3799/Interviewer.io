
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { createApplication, createJob, findApplication, findAppliedJobs, findInterview, findJobs, getJob } from '../services/job';
import { prepareAtsScore } from '../services/resumeReport';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = "resume"; // fallback
      const uploadPath = path.join(__dirname, "../../uploads", folder);
  
      // Create folder if it doesn't exist
      fs.mkdirSync(uploadPath, { recursive: true });
  
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
  
const upload = multer({ storage: storage})



router.post("/add", upload.any(), async (req, res)=>{
    const neededKeys = ["title",
        "orgName",
        "department",
        "roleType",
        "location",
        "role",
        "qualification",
        "about"]

    try{
        if(!Object.keys(req.body).some((element)=> neededKeys.includes(element))){
            throw new Error("Mandatory fields missing")
        }
        const jobId = await createJob(req.body)
        return res.status(200).send({
            success: true,
            message: "Successfully job created",
            jobId
        })
    }
    catch(e){
        console.log(e, "Error in creating job")
        return res.status(404).send({
            message: "Failed to add job",
            success: false
        })
    }
})

router.get("/", async(req, res)=>{
    try{

        const {userId} = req.query;
        let jobs = await findJobs();

        if(userId){
           let newJobs = await findAppliedJobs(jobs, userId as string);
           return res.status(200).send({
            success: true,
            message: "Jobs found successfully",
            jobs: newJobs
        })
        }
        return res.status(200).send({
            success: true,
            message: "Jobs found successfully",
            jobs
        })
        
    }catch(e){
        console.log(e, "Error in creaitng job");
        return res.status(404).send({
            message: "Failed to fetch jobs",
            success: false
        })
    }
})


router.get("/:jobId", async(req, res)=>{
    try{

        let {jobId} = req.params;

        if(!jobId){
            throw new Error("Error in creating application");
        }
        const application = await findApplication(jobId)
        const jobInformaiton = await getJob(jobId);
        return res.status(200).send({
            message: "Job Application Found",
            success: true,
            application: application,
            job: jobInformaiton

        })
    }catch(e){
        console.log(e, "error in job application")
        return res.status(404).send({
            message: "Failed to job apply",
            success: false
        })
    }
})

router.get("/user/:userId", async(req, res)=>{
    try{

        let {userId} = req.params;

        if(!userId){
            throw new Error("Error in creating application");
        }
        const interviews = await findInterview(userId)
        return res.status(200).send({
            message: "Job Application Found",
            success: true,
            interviews: interviews,

        })
    }catch(e){
        console.log(e, "error in job interview")
        return res.status(404).send({
            message: "Failed to find interviews",
            success: false
        })
    }
})

router.post("/apply", upload.single("resume"), async(req, res)=>{
    try{

        let {jobId, userId} = req.body;

        if(!jobId || !userId || !req.file){
            throw new Error("Error in creating application");
        }

        let filePath = req.file.path;
        let fileName = req.file.filename;
        await createApplication(jobId, userId, fileName)
        prepareAtsScore(jobId, userId, filePath)
        return res.status(200).send({
            message: "Successfully created job",
            success: true
        })
    }catch(e){
        console.log(e, "error in job application")
        return res.status(404).send({
            message: "Failed to job apply",
            success: false
        })
    }
})

export default router;
