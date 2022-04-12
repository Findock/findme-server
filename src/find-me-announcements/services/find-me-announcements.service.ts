import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateFindMeAnnouncementDto } from "@/find-me-announcements/dto/create-find-me-announcement.dto";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeAnnouncementsService {
    public constructor(
        @InjectRepository(FindMeAnnouncement)
        private announcementsRepository: Repository<FindMeAnnouncement>
    ) { }

    public async createAnnouncement(
        creator: FindMeUser,
        createDto: CreateFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement> {
        const distinctiveFeatures = createDto.distinctiveFeaturesIds
            .map(distinctiveFeatureId => ({ id: distinctiveFeatureId }));
        const coatColors = createDto.coatColorsIds
            .map(coatColorIds => ({ id: coatColorIds }));
        const photos = createDto.photosIds
            .map(photoIds => ({ id: photoIds }));

        const createdAnnouncement = this.announcementsRepository.create({
            category: createDto.category,
            title: createDto.title,
            description: createDto.description,
            gender: createDto.gender,
            type: createDto.type,
            locationName: createDto.locationName,
            locationDescription: createDto.locationDescription,
            locationLat: createDto.locationLat,
            locationLon: createDto.locationLon,
            distinctiveFeatures,
            coatColors,
            photos,
            creator: creator,
        });
        await this.announcementsRepository.save(createdAnnouncement);
        return createdAnnouncement;
    }
}
