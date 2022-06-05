import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateFindMeAnnouncementDto } from "@/find-me-announcements/dto/create-find-me-announcement.dto";
import { SearchFindMeAnnouncementDto } from "@/find-me-announcements/dto/search-find-me-announcement.dto";
import { SearchNearbyMeAnnouncementDto } from "@/find-me-announcements/dto/search-nearby-find-me-announcement-dto";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnnouncementStatusEnum } from "@/find-me-announcements/enums/find-me-announcement-status.enum";
import { FindMeAnnouncementsSortingModeEnum }
    from "@/find-me-announcements/enums/find-me-announcements-sorting-mode.enum";
import { FindMeAnnouncementViewLogsService }
    from "@/find-me-announcements/services/find-me-announcement-view-logs.service";
import { FindMeFavoriteAnnouncementsService }
    from "@/find-me-announcements/services/find-me-favorite-announcements.service";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeNominatimService } from "@/find-me-location/services/find-me-nominatim.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeAnnouncementsService {
    public constructor(
        @InjectRepository(FindMeAnnouncement)
        private announcementsRepository: Repository<FindMeAnnouncement>,
        private favoriteAnnouncementsService: FindMeFavoriteAnnouncementsService,
        private announcementViewLogsService: FindMeAnnouncementViewLogsService,
        private nominatimService: FindMeNominatimService
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
            creator,
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

    public async getUserLastViewedAnnouncements(user: FindMeUser): Promise<FindMeAnnouncement[]> {
        const userViewLogs = await this.announcementViewLogsService.getUserAnnouncementsViewLogs(user);
        const viewedAnnouncements = userViewLogs.map(viewLog => viewLog.viewedAnnouncement).reverse();
        return viewedAnnouncements.filter((announcement, index) =>
            viewedAnnouncements.map(a => a.id).indexOf(announcement.id) === index);
    }

    public async getAllAnnouncements(): Promise<FindMeAnnouncement[]> {
        return this.announcementsRepository.find({
            relations: [
                "creator",
                "distinctiveFeatures",
                "category",
                "coatColors",
                "photos",
            ],
        });
    }

    public async searchUserAnnouncements(
        user: FindMeUser,
        searchDto: SearchFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement[]> {
        const announcements = await this.getAllUserAnnouncements(user);
        return this.narrowResultByFilters(announcements, user, searchDto);
    }

    public async searchLastViewedAnnouncements(
        user: FindMeUser,
        searchDto: SearchFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement[]> {
        const announcements = await this.getUserLastViewedAnnouncements(user);
        return this.narrowResultByFilters(announcements, user, searchDto);
    }

    public async searchAnnouncements(
        searchingUser: FindMeUser,
        searchDto: SearchFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement[]> {
        const announcements = await this.getAllAnnouncements();
        return this.narrowResultByFilters(announcements, searchingUser, searchDto);
    }

    public async searchRecentlyCreatedAnnouncements(
        searchingUser: FindMeUser,
        searchDto: SearchFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement[]> {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const announcements = (await this.getAllAnnouncements()).filter(announcement =>
            announcement.createDate.getTime() >= (new Date().getTime() - oneDayInMilliseconds));
        return this.narrowResultByFilters(announcements, searchingUser, searchDto);
    }

    public async searchNearbyAnnouncements(
        searchDto: SearchNearbyMeAnnouncementDto
    ): Promise<FindMeAnnouncement[]> {
        const locationThreshold = 20 * 0.01;
        const announcements = (await this.getAllAnnouncements()).filter(announcement =>
            announcement.locationLat <= searchDto.locationLat + locationThreshold &&
            announcement.locationLat >= searchDto.locationLat - locationThreshold &&
            announcement.locationLon <= searchDto.locationLon + locationThreshold &&
            announcement.locationLon >= searchDto.locationLon - locationThreshold);

        const pageSize = searchDto.pageSize || 10;
        const offset = searchDto.offset || 0;

        return this.paginateResults(announcements, offset, pageSize);
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

    public async resolveAnnouncement(
        announcement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<FindMeAnnouncement> {
        if (announcement.creator.id !== user.id) {
            throw new UnauthorizedException([ ErrorMessagesConstants.USER_IS_NOT_AUTHORIZED_TO_DO_THIS_ACTION ]);
        }
        announcement.status = FindMeAnnouncementStatusEnum.NOT_ACTIVE;
        await this.announcementsRepository.save(announcement);
        return announcement;
    }

    public async makeActiveAnnouncement(
        announcement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<FindMeAnnouncement> {
        if (announcement.creator.id !== user.id) {
            throw new UnauthorizedException([ ErrorMessagesConstants.USER_IS_NOT_AUTHORIZED_TO_DO_THIS_ACTION ]);
        }
        announcement.status = FindMeAnnouncementStatusEnum.ACTIVE;
        await this.announcementsRepository.save(announcement);
        return announcement;
    }

    public async archiveAnnouncement(
        announcement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<FindMeAnnouncement> {
        if (announcement.creator.id !== user.id) {
            throw new UnauthorizedException([ ErrorMessagesConstants.USER_IS_NOT_AUTHORIZED_TO_DO_THIS_ACTION ]);
        }
        announcement.status = FindMeAnnouncementStatusEnum.ARCHIVED;
        await this.announcementsRepository.save(announcement);
        return announcement;
    }

    private async narrowResultByFilters(
        announcements: FindMeAnnouncement[],
        searchingUser: FindMeUser,
        searchDto: SearchFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement[]> {
        if (searchDto.onlyActive) {
            announcements = announcements.filter(a => a.status === FindMeAnnouncementStatusEnum.ACTIVE);
        }

        if (searchDto.onlyFavorites) {
            announcements = (await Promise.all(announcements.map(async a => {
                if (await this.favoriteAnnouncementsService.isAnnouncementInUserFavorites(a, searchingUser)) return a;
                return null;
            }))).filter(a => {
                return a !== null;
            });
        }

        if (searchDto.textQuery) {
            const textQuery = searchDto.textQuery.toLowerCase();
            announcements = announcements.filter(announcement =>
                announcement.title.toLowerCase().includes(textQuery) ||
                announcement.description.toLowerCase().includes(textQuery));
        }

        if (searchDto.categoriesIds && searchDto.categoriesIds.length > 0) {
            announcements = announcements
                .filter(announcement => searchDto.categoriesIds.includes(announcement.category.id));
        }

        if (searchDto.distinctiveFeaturesIds && searchDto.distinctiveFeaturesIds.length > 0) {
            announcements = announcements
                .filter(announcement =>
                    announcement.distinctiveFeatures.length >= searchDto.distinctiveFeaturesIds.length &&
                    searchDto.distinctiveFeaturesIds
                        .every(distinctiveFeaturesId => announcement.distinctiveFeatures
                            .map(distinctiveFeature => distinctiveFeature.id).includes(distinctiveFeaturesId)));
        }

        if (searchDto.type) {
            announcements = announcements
                .filter(announcement => announcement.type === searchDto.type);
        }

        if (searchDto.genders && searchDto.genders.length > 0) {
            announcements = announcements
                .filter(announcement => searchDto.genders.includes(announcement.gender));
        }

        if (searchDto.coatColorsIds && searchDto.coatColorsIds.length > 0) {
            announcements = announcements
                .filter(announcement => announcement.coatColors.length >= searchDto.coatColorsIds.length &&
                    searchDto.coatColorsIds
                        .every(coatColorId => announcement.coatColors
                            .map(coatColor => coatColor.id).includes(coatColorId)));
        }

        if (searchDto.locationQuery) {
            const possibleLocations = await this.nominatimService.searchLocationsByQuery(searchDto.locationQuery);
            if (possibleLocations.length === 0) {
                announcements = [];
            } else {
                const [ bestLocation ] = possibleLocations;
                const {
                    lat: bestLat,
                    lon: bestLon,
                } = bestLocation;
                const locationThreshold = (searchDto.locationThreshold || 15) * 0.01;

                announcements = announcements.filter(announcement =>
                    announcement.locationLat <= bestLat + locationThreshold &&
                    announcement.locationLat >= bestLat - locationThreshold &&
                    announcement.locationLon <= bestLon + locationThreshold &&
                    announcement.locationLon >= bestLon - locationThreshold);
            }
        }

        announcements = announcements.sort((a, b) => {
            switch (searchDto.sortingMode) {
                case FindMeAnnouncementsSortingModeEnum.BY_OLDEST:
                    return a.createDate.getTime() - b.createDate.getTime();
                case FindMeAnnouncementsSortingModeEnum.BY_NEWEST:
                default:
                    return b.createDate.getTime() - a.createDate.getTime();
            }
        });

        const pageSize = searchDto.pageSize || 10;
        const offset = searchDto.offset || 0;

        return this.paginateResults(announcements, offset, pageSize);
    }

    private paginateResults(
        announcements: FindMeAnnouncement[],
        offset: number,
        pageSize: number
    ): FindMeAnnouncement[] {
        return announcements.filter((_, i) => i >= offset && i < offset + pageSize);
    }
}
