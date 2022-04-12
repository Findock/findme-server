import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";

export class CreateFindMeAnnouncementDto {
    public category: FindMeAnnouncementCategory;

    public title: string;

    public description: string;

    public gender: FindMeAnimalGenderEnum;

    public type: FindMeAnnouncementTypeEnum;

    public distinctiveFeaturesIds: number[];

    public coatColorsIds: number[];

    public photosIds: number[];

    public locationName: string;

    public locationDescription: string;

    public locationLat: number;

    public locationLon: number;
}
