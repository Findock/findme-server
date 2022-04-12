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

    @ApiProperty({ enum: FindMeAnnouncementTypeEnum })
    @IsEnum(FindMeAnnouncementTypeEnum)
    public type: FindMeAnnouncementTypeEnum;

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    public distinctiveFeaturesIds: number[];

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    public coatColorsIds: number[];

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    public photosIds: number[];

    @ApiProperty({ example: "Kraków, województwo małopolskie" })
    @IsString()
    public locationName: string;

    @ApiProperty({ example: "W okolicach lasu krakowa" })
    @IsString()
    public locationDescription: string;

    @ApiProperty({ example: 50.0469432 })
    @IsNumber()
    public locationLat: number;

    @ApiProperty({ example: 19.997153435836697 })
    @IsNumber()
    public locationLon: number;
}
