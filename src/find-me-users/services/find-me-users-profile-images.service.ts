import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeUsersProfileImagesService {
    public constructor(
        @InjectRepository(FindMeUser)
        private usersRepository: Repository<FindMeUser>
    ) { }

    public async updateUserProfileImage(userId: string, imageUrl: string): Promise<FindMeUser> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        user.profileImageUrl = imageUrl;
        await this.usersRepository.save(user);
        return user;
    }

    public async removeUserProfileImage(user: FindMeUser): Promise<FindMeUser> {
        user.profileImageUrl = "";
        await this.usersRepository.save(user);
        return user;
    }
}
