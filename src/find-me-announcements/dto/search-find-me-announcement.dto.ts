import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

import { OffsetPaginationDto } from "@/find-me-commons/dto/offset-pagination.dto";

export class SearchFindMeAnnouncementDto extends OffsetPaginationDto {
    @ApiProperty({ example: false })
    @IsBoolean()
    public onlyActive: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    public onlyFavorites: boolean;
}
