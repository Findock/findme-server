import { ApiProperty } from "@nestjs/swagger";

export class FindMeLocationSearchByQueryDto {
    @ApiProperty({ example: "Krakow" })
    public query: string;
}
