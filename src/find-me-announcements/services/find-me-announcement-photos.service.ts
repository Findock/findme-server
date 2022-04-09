import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeAnnouncementPhotosService {
    public constructor(
        @InjectRepository(FindMeAnnouncementPhoto)
        private announcementPhotosRepository: Repository<FindMeAnnouncementPhoto>
    ) { }

    public async createAnnouncementPhoto(user: FindMeUser, photoUrl: string): Promise<FindMeAnnouncementPhoto> {
        const announcementPhoto = this.announcementPhotosRepository.create({
            user,
            url: photoUrl,
        });
        await this.announcementPhotosRepository.save(announcementPhoto);
        return announcementPhoto;
    }
}
