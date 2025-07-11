import express from 'express';
import { createUser, validateUser } from '../services/user';
const router = express.Router();


router.post("/login", async (req, res)=>{
    try{
        let {userName, password} = req.body;

        if(!userName || !password){
            throw({message: "UserName or Password missing", userName, password});
        }
        const session = await validateUser(userName, password);
        res.cookie('session', session);
        return res.status(200).send({
            message: "User verified successfully"
        })
    }catch(e){
        console.log(e, 'Error in Finding User.')
        return res.status(400).send({
            message: "User not found"
        })
    }
})

router.post("/sign-up", async(req, res)=>{


    try{
        let {name, userName, password, address} = req.body;

        if(!name || !userName || !password || !address){
            throw new Error("Mandatory details missing")
        }

        const response = await createUser(name, userName, password, address);

        return res.status(200).send({
            message: "User Created Successfully"
        })
    } catch(e){
        console.log(e, 'Error in Creating User.')
        return res.status(400).send({
            message: "Failed to create user"
        })
    }
})


export default router;
