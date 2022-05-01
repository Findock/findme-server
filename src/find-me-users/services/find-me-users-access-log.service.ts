import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUserAccessLog } from "@/find-me-users/entities/find-me-user-access-log.entity";

@Injectable()
export class FindMeUsersAccessLogService {
    public constructor(
        @InjectRepository(FindMeUserAccessLog)
        private usersAccessLogRepository: Repository<FindMeUserAccessLog>
    ) {}

    public async logUserAccessByAnotherUser(
        accessedUser: FindMeUser,
        accessingUser: FindMeUser
    ): Promise<void> {
        const accessLog = this.usersAccessLogRepository.create({
            accessedUser: accessedUser,
            accessingUser: accessingUser,
        });
        await this.usersAccessLogRepository.save(accessLog);
    }
}
