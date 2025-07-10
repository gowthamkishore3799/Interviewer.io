import bodyParser from 'body-parser';
import express from 'express';
import ssoRouter from "./routes/ssoRouter";

const app = express();



app.use(bodyParser.json({}));
app.use("/v1/sso", ssoRouter);


app.listen(3000, ()=>{
    console.log("Listening to port")
})