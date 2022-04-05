import { ApiProperty } from "@nestjs/swagger";

export class FindMeLocationSearchByQueryResultDto {
    @ApiProperty()
    public name: string;

    @ApiProperty()
    public lat: number;

    @ApiProperty()
    public lon: number;
}
