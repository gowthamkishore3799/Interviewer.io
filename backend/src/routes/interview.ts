import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { ApplicationInfo } from '../models/applications';
import { handleInterview, startInterview } from '../services/interview';

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = "video"; // fallback
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


router.post("/start", async(req, res)=>{
    try{
        let {jobId, userId} = req.body;

        if(!jobId || !userId){
            throw new Error("Error in starting interview")
        }

        let interviewId = await startInterview(jobId, userId)


        return res.status(200).send({
            message: "Interview started",
            success: true,
            interviewId
        })
    }catch(e){
        console.log(e, "Fail to start as interview")
        return res.status(404).send({
            message: "Failed to start interview",
            success: false,
        })
    }
})

router.post("/conversation", async(req, res)=>{
    try {
      let { interviewId, userId, userResponse= "", audioBase64 =""} = req.body;

      if (!interviewId || !userId) {
        throw new Error("Error in interview conversation");
      }


      let conversation = await handleInterview(userId, interviewId, userResponse, audioBase64)

      return res.status(200).send({
        message: "interview",
        success: true,
        conversation
      })
    } catch (e) {
      console.log(e, "Error in having conversation");
      return res.status(404).send({
        message: "Failed to conduct interview",
        success: false,
      });
    }
})

router.post("/transcripts", upload.single("video"), async(req, res)=>{
    let filePath = req?.file?.path;
    let fileName = req?.file?.filename;
    let { interviewId } = req.body;

    await ApplicationInfo.updateInterview({interviewId}, {interviewMetaData: fileName});
    try{
        return res.status(200).send({
            message: "Transcripts uploaded successfully",
            success: true,
          })
    }catch(e){
        return res.status(404).send({
            message: "Failed to upload transcripts",
            success: false,
        })
    }
})

export default router ;
