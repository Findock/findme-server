import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { FindMeUser, FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";

@Injectable()
export class FindMeUsersProfileImagesService {
    public constructor(
        @InjectModel(FindMeUser.name) private readonly userModel: Model<FindMeUserDocument>
    ) { }

    public async updateUserProfileImage(userId: string, imageUrl: string): Promise<FindMeUser> {
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { profileImageUrl: imageUrl },
            { new: true }
        ).lean();
        delete user.password;
        return user;
    }

    public async removeUserProfileImage(userId: string): Promise<FindMeUser> {
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { profileImageUrl: "" },
            { new: true }
        ).lean();
        delete user.password;
        return user;
    }
}
