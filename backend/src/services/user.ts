import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { HASHING_ROUNDS } from "../constants/hashing";
import { UserInfo } from "../models/userModel";


async function validateUser(userName: string, password: string){
    const user = await UserInfo.findUser(userName);
    
    if(!user){
        throw new Error("user not found")
    }
    const isVerifiedUser = await bcrypt.compare(password, user.password)

    if(!isVerifiedUser){
        throw new Error("Invalid user creds")
    }

    const sessionId = uuidv4();
    return sessionId;
}

async function createUser(name: string, userName: string, password: string, address: string){
    const userId = uuidv4();
    const salt =await bcrypt.genSalt(HASHING_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword, "OASseds")

    await UserInfo.createUser({userName,
        password: hashedPassword,
        name,
        address,
        userId,
    })
    const sessionId = uuidv4();
    return sessionId;
}


export { createUser, validateUser };

