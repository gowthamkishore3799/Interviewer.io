import mongoose, { Model, Schema } from "mongoose";
import { UserData } from "../interface/user";

export class UserInfo {
    private static model: Model<UserData>;

    public static init(): void {
        if (this.model) return;

        const schema = new Schema<UserData>(
            {
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                name: {type: String, required: true},
                candidateType: {type: String, required: true},
                userId: {type: String, required: true}
            },
            { timestamps: true }
        );

        schema.index({email:1})

        this.model = mongoose.model<UserData>('User', schema);
    }

    public static async findUser(email: string){
        const user = await UserInfo.model.findOne({email}).select({name: 1, candidateType:1, email: 1, password: 1, userId: 1}).lean()
        return user;
    }

    public static async findUsers(userId: string[]){
        const user = await UserInfo.model.find({userId: userId}).select({name: 1, candidateType:1, email: 1, userId: 1 }).lean()
        return user;
    }


    public static async createUser({email, password, name, userId, candidateType}: UserData){
        const User = UserInfo.model;
        console.log(email, name, password)

        let user = new User({email, password, name, userId, candidateType});
        await user.save()
    }
}