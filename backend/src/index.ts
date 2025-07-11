import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { Database } from './models';
import ssoRouter from "./routes/ssoRouter";


const app = express();

Database.init();

app.use(bodyParser.json({}));
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


app.listen(process.env.PORT, ()=>{
    console.log("Listening to port", process.env.PORT)
})