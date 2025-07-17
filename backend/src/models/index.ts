import { MongoSingleton } from "../database/mongodb";
import RedisSingleton from "../database/redis";
import { ApplicationInfo } from "./applications";
import { Interview } from "./interview";
import { JobsModel } from "./jobModel";
import { UserInfo } from "./userModel";

export class Database{
    public static async init(){
        MongoSingleton.getConnection();
        RedisSingleton.getInstance();
        UserInfo.init();
        JobsModel.init();
        ApplicationInfo.init();
        Interview.init();
    }
}