import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateFindMeAnnouncementDto } from "@/find-me-announcements/dto/create-find-me-announcement.dto";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnnouncementStatusEnum } from "@/find-me-announcements/enums/find-me-announcement-status.enum";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
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
        const category = { id: createDto.categoryId };

        const createdAnnouncement = this.announcementsRepository.create({
            title: createDto.title,
            description: createDto.description,
            gender: createDto.gender,
            type: createDto.type,
            locationName: createDto.locationName,
            locationDescription: createDto.locationDescription,
            locationLat: createDto.locationLat,
            locationLon: createDto.locationLon,
            category,
            distinctiveFeatures,
            coatColors,
            photos,
            creator: creator,
        });
        await this.announcementsRepository.save(createdAnnouncement);
        return createdAnnouncement;
    }

    public async updateAnnouncementById(
        announcementId: number,
        updatingUser: FindMeUser,
        updateDto: CreateFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement> {
        const announcement = await this.announcementsRepository.findOne({
            where: { id: announcementId },
            relations: [
                "creator",
                "distinctiveFeatures",
                "category",
                "coatColors",
                "photos",
            ],
        });

        if (!announcement) throw new BadRequestException(ErrorMessagesConstants.ANNOUNCEMENT_DOES_NOT_EXIST);
        const isUserCreator = await this.isUserCreatorOfAnnouncement(updatingUser, announcement);
        if (!isUserCreator) throw new UnauthorizedException();

        const distinctiveFeatures = updateDto.distinctiveFeaturesIds
            .map(distinctiveFeatureId => ({ id: distinctiveFeatureId }));
        const coatColors = updateDto.coatColorsIds
            .map(coatColorIds => ({ id: coatColorIds }));
        const photos = updateDto.photosIds
            .map(photoIds => ({ id: photoIds }));
        const category = { id: updateDto.categoryId };

        announcement.title = updateDto.title;
        announcement.description = updateDto.description;
        announcement.gender = updateDto.gender;
        announcement.type = updateDto.type;
        announcement.locationName = updateDto.locationName;
        announcement.locationDescription = updateDto.locationDescription;
        announcement.locationLat = updateDto.locationLat;
        announcement.locationLon = updateDto.locationLon;
        announcement.category = category as FindMeAnnouncementCategory;
        announcement.distinctiveFeatures = distinctiveFeatures as FindMeDistinctiveFeature[];
        announcement.coatColors = coatColors as FindMeCoatColor[];
        announcement.photos = photos as FindMeAnnouncementPhoto[];

        await this.announcementsRepository.save(announcement);

        return announcement;
    }

    public async getAllUserAnnouncements(user: FindMeUser): Promise<FindMeAnnouncement[]> {
        return this.announcementsRepository.find({
            where: { creator: user.id },
            relations: [
                "creator",
                "distinctiveFeatures",
                "category",
                "coatColors",
                "photos",
            ],
        });
    }

    public async getActiveUserAnnouncements(user: FindMeUser): Promise<FindMeAnnouncement[]> {
        return this.announcementsRepository.find({
            where: {
                creator: user.id,
                status: FindMeAnnouncementStatusEnum.ACTIVE,
            },
            relations: [
                "creator",
                "distinctiveFeatures",
                "category",
                "coatColors",
                "photos",
            ],
        });
    }

    public async getAnnouncementById(announcementId: number): Promise<FindMeAnnouncement> {
        const announcement = await this.announcementsRepository.findOne({
            where: { id: announcementId },
            relations: [
                "creator",
                "distinctiveFeatures",
                "category",
                "coatColors",
                "photos",
            ],
        });
        if (!announcement) throw new BadRequestException(ErrorMessagesConstants.ANNOUNCEMENT_DOES_NOT_EXIST);
        return announcement;
    }

    public isUserCreatorOfAnnouncement(user: FindMeUser, announcement: FindMeAnnouncement): boolean {
        return announcement.creator.id === user.id;
    }
}
