import { ApiProperty } from "@nestjs/swagger";

export class OffsetPaginationDto {
    @ApiProperty({ example: 10 })
    public pageSize: number;

    @ApiProperty({ example: 0 })
    public offset: number;
}
