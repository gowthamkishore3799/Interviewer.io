import { Mongodb } from "../database/mongodb";
import { UserInfo } from "./userModel";

export class Database{
    public static async init(){
        Mongodb.getInstance();
        UserInfo.init();
    }
}