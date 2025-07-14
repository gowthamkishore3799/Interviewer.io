import { Mongodb } from "../database/mongodb";
import { ApplicationInfo } from "./applications";
import { JobsModel } from "./jobModel";
import { UserInfo } from "./userModel";

export class Database{
    public static async init(){
        Mongodb.getInstance();
        UserInfo.init();
        JobsModel.init();
        ApplicationInfo.init();
    }
}