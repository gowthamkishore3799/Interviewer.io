import mongoose, { Model, Schema } from "mongoose";
import { UserData } from "../interface/user";

export class UserInfo {
    private static model: Model<UserData>;

    public static init(): void {
        if (this.model) return;

        const schema = new Schema<UserData>(
            {
                userName: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                name: {type: String, required: true},
                address: {type: String, required: true},
                userId: {type: String, required: true}
            },
            { timestamps: true }
        );

        this.model = mongoose.model<UserData>('User', schema);
    }

    public static async findUser(userName: string){
        const user = await UserInfo.model.findOne({userName}).lean()
        return user;
    }


    public static async createUser({userName, password, name, userId, address}: UserData){
        const User = UserInfo.model;

        let user = new User({userName, password, name, userId, address});
        await user.save()
    }
}