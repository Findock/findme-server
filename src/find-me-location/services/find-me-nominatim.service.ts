import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeLocationSearchResultDto, NominatimAddressObject }
    from "@/find-me-location/dto/find-me-lication-search-result.dto";

@Injectable()
export class FindMeNominatimService {
    private readonly nominatimRootUrl = "https://nominatim.openstreetmap.org/";
    private readonly defaultCountryQuery = "Polska";
    private readonly defaultCountryCode = "pl";
    private isNominatimAvailable = false;

    public constructor(
        private httpService: HttpService
    ) {
        this.updateIsNominatimAvailableFlag();
    }

    private parseNominatimName(nominatimAddress: NominatimAddressObject): string {
        if (!nominatimAddress) {
            return "unknown";
        }
        if (nominatimAddress.village) {
            return `${nominatimAddress.village}, ${nominatimAddress.county}`;
        }
        if (nominatimAddress.suburb) {
            return `${nominatimAddress.suburb}, ${nominatimAddress.county}`;
        }
        if (nominatimAddress.city) {
            return `${nominatimAddress.city}, ${nominatimAddress.state}`;
        }
        if (nominatimAddress.municipality) {
            return `${nominatimAddress.municipality}, ${nominatimAddress.state}`;
        }
        return `${nominatimAddress.state}`;
    }

    private async updateIsNominatimAvailableFlag(): Promise<void> {
        if (this.isNominatimAvailable) return;
        try {
            const res = await firstValueFrom(this.httpService.get(this.nominatimRootUrl + "/status"));
            if (res.status === 200) {
                Logger.log("Connected to Nominatim location API service!", "FindMeNominatimService");
                this.isNominatimAvailable = true;
            }
        } catch {
            Logger.error("Failed to connect to Nominatim location API service!", "FindMeNominatimService");
        }
    }

    public async searchLocationsByQuery(query: string): Promise<FindMeLocationSearchResultDto[]> {
        await this.updateIsNominatimAvailableFlag();
        if (!this.isNominatimAvailable) {
            throw new InternalServerErrorException([ ErrorMessagesConstants.NOMINATIM_SERVICE_UNREACHABLE ]);
        }
        const res = await firstValueFrom(this.httpService.get(this.nominatimRootUrl + "/search", {
            params: {
                q: query,
                country: this.defaultCountryQuery,
                countrycodes: this.defaultCountryCode,
                format: "jsonv2",
                limit: 5,
                addressdetails: 1,
                email: "mateusz@gmail.com",
            },
        }));

        return res.data.map(i => ({
            address: i.address,
            name: this.parseNominatimName(i.address),
            lat: +i.lat,
            lon: +i.lon,
        }));
    }

    public async searchLocationsByCoordinates(
        lat: number,
        lon: number
    ): Promise<FindMeLocationSearchResultDto> {
        await this.updateIsNominatimAvailableFlag();
        if (!this.isNominatimAvailable) {
            throw new InternalServerErrorException([ ErrorMessagesConstants.NOMINATIM_SERVICE_UNREACHABLE ]);
        }
        const res = await firstValueFrom(this.httpService.get(this.nominatimRootUrl + "/reverse", {
            params: {
                lat,
                lon,
                zoom: 14,
                format: "jsonv2",
                addressdetails: 1,
                email: "mateusz@gmail.com",
            },
        }));

        return {
            address: res.data.address,
            name: this.parseNominatimName(res.data.address),
            lat: +res.data.lat,
            lon: +res.data.lon,
        };
    }
}
