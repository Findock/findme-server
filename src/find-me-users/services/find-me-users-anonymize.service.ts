import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { FindMeUser, FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";
import {
    FindMeUserDeleteLog,
    FindMeUserDeleteLogDocument,
} from "@/find-me-users/schemas/find-me-user-delete-log.schema";

@Injectable()
export class FindMeUsersAnonymizeService {
    public constructor(
        @InjectModel(FindMeUser.name) private readonly userModel: Model<FindMeUserDocument>,
        @InjectModel(FindMeUserDeleteLog.name) private readonly userDeleteLogModel: Model<FindMeUserDeleteLogDocument>,
    ) { }

    public async anonymizeUserData(userId: string): Promise<void> {
        const anonymizedUserData = {
            email: "",
            password: "",
            name: "deleted",
            phoneNumber: "",
            profileImageUrl: "",
            street: "",
            city: "",
            bio: "",
        };
        await this.userModel.findByIdAndUpdate(userId, anonymizedUserData);
        await this.userDeleteLogModel.create({ user: userId });
    }
}
