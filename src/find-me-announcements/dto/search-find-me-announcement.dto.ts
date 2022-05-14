import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional } from "class-validator";

import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";
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
    public categoryIds?: number[];

    @ApiProperty({ example: [ 1 ] })
    @IsNumber()
    @IsOptional()
    public genders?: string[];

    @ApiProperty({ example: [ 1 ] })
    @IsArray()
    @IsOptional()
    public distinctiveFeaturesIds?: number[];

    @ApiProperty({ example: [ FindMeAnnouncementTypeEnum.LOST ] })
    @IsArray()
    @IsOptional()
    public types?: FindMeAnnouncementTypeEnum[];

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    @IsOptional()
    public coatColorsIds?: number[];
}
