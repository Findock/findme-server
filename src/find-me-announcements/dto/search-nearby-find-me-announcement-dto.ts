import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

import { OffsetPaginationDto } from "@/find-me-commons/dto/offset-pagination.dto";

export class SearchNearbyMeAnnouncementDto extends OffsetPaginationDto {
    @ApiProperty({ example: 50.0469432 })
    @IsNumber()
    public locationLat: number;

    @ApiProperty({ example: 19.997153435836697 })
    @IsNumber()
    public locationLon: number;
}
