import { ApiProperty } from "@nestjs/swagger";

export class NominatimAddressObject {
    @ApiProperty()
    public continent?: string;

    @ApiProperty()
    public country?: string;

    @ApiProperty()
    public country_code?: string;

    @ApiProperty()
    public region?: string;

    @ApiProperty()
    public state?: string;

    @ApiProperty()
    public state_district?: string;

    @ApiProperty()
    public county?: string;

    @ApiProperty()
    public "ISO3166-2-lvl"?: string;

    @ApiProperty()
    public municipality?: string;

    @ApiProperty()
    public city?: string;

    @ApiProperty()
    public town?: string;

    @ApiProperty()
    public village?: string;

    @ApiProperty()
    public city_district?: string;

    @ApiProperty()
    public district?: string;

    @ApiProperty()
    public borough?: string;

    @ApiProperty()
    public suburb?: string;

    @ApiProperty()
    public hamlet?: string;

    @ApiProperty()
    public croft?: string;

    @ApiProperty()
    public isolated_dwelling?: string;

    @ApiProperty()
    public neighbourhood?: string;

    @ApiProperty()
    public allotments?: string;

    @ApiProperty()
    public quarter?: string;

    @ApiProperty()
    public road?: string;

    @ApiProperty()
    public postcode?: string;
}

export class FindMeLocationSearchResultDto {
    @ApiProperty()
    public address: NominatimAddressObject;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public lat: number;

    @ApiProperty()
    public lon: number;
}
