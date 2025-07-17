import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import fs from "fs";
import path from 'path';
import { LLM } from './ai/openai';
import RedisSingleton from './database/redis';
import { Database } from './models';
import interviewRouter from "./routes/interview";
import jobsRouter from './routes/jobsRouter';
import ssoRouter from "./routes/ssoRouter";


const app = express();

interface AuthedRequest extends Request {
  cookies: { [key: string]: string };
  user?: any;
}

Database.init();
LLM.init();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb"}))
app.use(cookieParser());


app.use("/v1/sso", ssoRouter);

async function requireAuth(req:AuthedRequest, res: Response, next: NextFunction){
  const sessionId = req.cookies.session;
  if (!sessionId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try{
    const session = await RedisSingleton.getKey(sessionId);
    if(!session){
      throw new Error("Error in finding session")
    }
    req.user = JSON.parse(session);
    next();
  } catch(e){
      return res.status(401).json({ error: "Session expired or invalid" });
  }
}

app.use(requireAuth)

app.use("/v1/jobs", jobsRouter);
app.use("/v1/interview", interviewRouter)

const RESUME_DIR = path.join(__dirname, "../uploads/resume"); // replace with your actual directory
const VIDEO_DIR = path.join(__dirname, "../uploads/video")


app.get("/resume/:resume", async(req,res)=>{
    const fileName = path.basename(req.params.resume); // prevents path traversal
    const filePath = path.join(RESUME_DIR, req.params.resume);
    console.log(fileName, "File nme")
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }
    res.setHeader("content-type", "application/pdf")
    res.sendFile(filePath)
})

app.get("/transcript/:transcript", (req, res) => {
    const fileName = path.basename(req.params.transcript); // Prevent path traversal
    const filePath = path.join(VIDEO_DIR, fileName);
  
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }
  
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  
      if (start >= fileSize) {
        res.status(416).send("Requested range not satisfiable");
        return;
      }
  
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
  
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/webm",
      });
  
      file.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/webm",
      });
  
      fs.createReadStream(filePath).pipe(res);
    }
  });


app.listen(process.env.PORT, ()=>{
    console.log("Listening to port", process.env.PORT)
})

