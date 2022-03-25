import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
    FindMeUserAccessLog,
    FindMeUserAccessLogDocument,
} from "@/find-me-users/schemas/find-me-user-access-log.schema";

@Injectable()
export class FindMeUsersAccessLogService {
    public constructor(
       @InjectModel(FindMeUserAccessLog.name) private readonly userAccessLogModel: Model<FindMeUserAccessLogDocument>
    ) {}

    public async logUserAccessByAnotherUser(
        accessedUserId: string,
        accessingUserId: string
    ): Promise<void> {
        await this.userAccessLogModel.create({
            accessedUser: accessedUserId,
            accessingUser: accessingUserId,
        });
    }
}
