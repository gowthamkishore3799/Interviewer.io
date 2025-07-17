import express from 'express';
import RedisSingleton from '../database/redis';
import { createUser, validateUser } from '../services/user';
const router = express.Router();


router.post("/login", async (req, res)=>{
    try{

        let {email, password} = req.body;

        
        if(!email || !password){
            throw({message: "Email or Password missing", email, password});
        }
        const {session, user } = await validateUser(email, password);
        let sessionKey = `session-${session}`;
        console.log(sessionKey, "Set session...")
        await RedisSingleton.setKey(sessionKey, JSON.stringify({userId: user.userId, email}))
        res.cookie('session', sessionKey);
        return res.status(200).send({
            message: "User verified successfully",
            success: true,
            user 
        })
    }catch(e){
        console.log(e, 'Error in Finding User.')
        return res.status(400).send({
            message: "User not found",
            success: false
        })
    }
})

router.post("/sign-up", async(req, res)=>{


    try{
        let {name, email, password, candidateType} = req.body;

        if(!name || !email || !password || !candidateType){
            throw new Error("Mandatory details missing")
        }

        const response = await createUser(name, email, password, candidateType);

        if(!response){
            throw new Error("Error in creating user")
        }
        return res.status(200).send({
            message: "User Created Successfully",
            success: true
        })
    } catch(e){
        console.log(e, 'Error in Creating User.')
        return res.status(400).send({
            message: "Failed to create user",
            success: false,
        })
    }
})


export default router;
