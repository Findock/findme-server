import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUserDeleteLog } from "@/find-me-users/entities/find-me-user-delete-log.entity";

@Injectable()
export class FindMeUsersAnonymizeService {
    public constructor(
        @InjectRepository(FindMeUser)
        private usersRepository: Repository<FindMeUser>,
        @InjectRepository(FindMeUserDeleteLog)
        private usersDeleteLogRepository: Repository<FindMeUserDeleteLog>
    ) { }

    public async anonymizeUserData(user: FindMeUser): Promise<void> {
        user.bio = "";
        user.email = "";
        user.name = "";
        user.phoneNumber = "";
        user.profileImageUrl = "";
        user.street = "";
        user.city = "";
        user.bio = "";
        await this.usersRepository.save(user);
        await this.usersDeleteLogRepository.create({ user: user });
    }
}
