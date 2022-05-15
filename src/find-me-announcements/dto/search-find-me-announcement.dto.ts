import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsOptional } from "class-validator";

import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";
import { FindMeAnnouncementsSortingModeEnum }
    from "@/find-me-announcements/enums/find-me-announcements-sorting-mode.enum";
import { OffsetPaginationDto } from "@/find-me-commons/dto/offset-pagination.dto";

export class SearchFindMeAnnouncementDto extends OffsetPaginationDto {
    @ApiProperty({ example: false })
    @IsBoolean()
    public onlyActive?: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    public onlyFavorites?: boolean;

    @ApiProperty({ example: [ 1 ] })
    @IsArray()
    @IsOptional()
    public categoriesIds?: number[];

    @ApiProperty({ example: [ FindMeAnimalGenderEnum.MALE ] })
    @IsArray()
    @IsOptional()
    public genders?: string[];

    @ApiProperty({ example: [ 1 ] })
    @IsArray()
    @IsOptional()
    public distinctiveFeaturesIds?: number[];

    @ApiProperty({ example: FindMeAnnouncementTypeEnum.LOST })
    @IsEnum(FindMeAnnouncementTypeEnum)
    @IsOptional()
    public type: FindMeAnnouncementTypeEnum;

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    @IsOptional()
    public coatColorsIds?: number[];

    @ApiProperty({ example: FindMeAnnouncementsSortingModeEnum.BY_NEWEST })
    @IsEnum(FindMeAnnouncementsSortingModeEnum)
    @IsOptional()
    public sortingMode?: FindMeAnnouncementsSortingModeEnum;
}
