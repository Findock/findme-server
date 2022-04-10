import { ApiProperty } from "@nestjs/swagger";

export class FindMeLocationSearchResultDto {
    @ApiProperty()
    public address: {
        continent?: string;
        country?: string;
        country_code?: string;
        region?: string;
        state?: string;
        state_district?: string;
        county?: string;
        "ISO3166-2-lvl"?: string;
        municipality?: string;
        city?: string;
        town?: string;
        village?: string;
        city_district?: string;
        district?: string;
        borough?: string;
        suburb?: string;
        hamlet?: string;
        croft?: string;
        isolated_dwelling?: string;
        neighbourhood?: string;
        allotments?: string;
        quarter?: string;
        road?: string;
        postcode?: string;
    };

    @ApiProperty()
    public lat: number;

    @ApiProperty()
    public lon: number;
}
