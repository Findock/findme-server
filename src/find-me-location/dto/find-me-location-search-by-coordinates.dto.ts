import { ApiProperty } from "@nestjs/swagger";

export class FindMeLocationSearchByCoordinatesDto {
    @ApiProperty({ example: 50.0469432 })
    public lat: number;

    @ApiProperty({ example: 19.997153435836697 })
    public lon: number;
}
