import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsString, MaxLength } from "class-validator";

import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";

export class CreateFindMeAnnouncementDto {
    @ApiProperty({ example: 1 })
    public categoryId: number;

    @ApiProperty({ example: "Zaginął piesek" })
    @IsString()
    @MaxLength(255)
    public title: string;

    @ApiProperty({ example: "Zaginął piesek był bardzo fajny i super" })
    @IsString()
    public description: string;

    @ApiProperty({ enum: FindMeAnimalGenderEnum })
    @IsEnum(FindMeAnimalGenderEnum)
    public gender: FindMeAnimalGenderEnum;

    @ApiProperty()
    @IsEnum(FindMeAnnouncementTypeEnum)
    public type: FindMeAnnouncementTypeEnum;

    @ApiProperty()
    @IsArray()
    public distinctiveFeaturesIds: number[];

    @ApiProperty()
    @IsArray()
    public coatColorsIds: number[];

    @ApiProperty()
    @IsArray()
    public photosIds: number[];

    @ApiProperty()
    @IsString()
    public locationName: string;

    @ApiProperty()
    @IsString()
    public locationDescription: string;

    @ApiProperty()
    @IsNumber()
    public locationLat: number;

    @ApiProperty()
    @IsNumber()
    public locationLon: number;
}
