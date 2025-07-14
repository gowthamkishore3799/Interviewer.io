import bodyParser from 'body-parser';
import cors from "cors";
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import fs from "fs";
import path from 'path';
import { Database } from './models';
import jobsRouter from './routes/jobsRouter';
import ssoRouter from "./routes/ssoRouter";


const app = express();

Database.init();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_PASSWORD as string,
    saveUninitialized: false,
    resave: true,
    cookie:{
        maxAge: 60*60*1000, //1hour
        httpOnly: true,
        secure: true,
    }
}))


app.use("/v1/sso", ssoRouter);
app.use("/v1/jobs", jobsRouter);

const RESUME_DIR = path.join(__dirname, "../uploads"); // replace with your actual directory


app.get("/:resume", async(req,res)=>{
    const fileName = path.basename(req.params.resume); // prevents path traversal
    const filePath = path.join(RESUME_DIR, req.params.resume);
    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }
    res.setHeader("content-type", "application/pdf")
    res.sendFile(filePath)
})


app.listen(process.env.PORT, ()=>{
    console.log("Listening to port", process.env.PORT)
})