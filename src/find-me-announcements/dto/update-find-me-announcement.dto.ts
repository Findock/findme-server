import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";

export class UpdateFindMeAnnouncementDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    public categoryId: number;

    @ApiProperty({ example: "Zaginął kotek" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    public title: string;

    @ApiProperty({ example: "Zaginął kotek był bardzo super i fajny" })
    @IsString()
    @IsNotEmpty()
    public description: string;

    @ApiProperty({ enum: FindMeAnimalGenderEnum })
    @IsEnum(FindMeAnimalGenderEnum)
    @IsNotEmpty()
    public gender: FindMeAnimalGenderEnum;

    @ApiProperty({ enum: FindMeAnnouncementTypeEnum })
    @IsEnum(FindMeAnnouncementTypeEnum)
    @IsNotEmpty()
    public type: FindMeAnnouncementTypeEnum;

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    public distinctiveFeaturesIds: number[];

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    @ArrayNotEmpty()
    public coatColorsIds: number[];

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    @ArrayNotEmpty()
    public photosIds: number[];

    @ApiProperty({ example: "Kraków, województwo małopolskie" })
    @IsString()
    @IsNotEmpty()
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
