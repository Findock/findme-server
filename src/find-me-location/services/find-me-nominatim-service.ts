import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeLocationSearchByQueryResultDto }
    from "@/find-me-location/dto/find-me-lication-search-by-query-result.dto";

@Injectable()
export class FindMeNominatimService {
    private readonly nominatimRootUrl = "https://nominatim.openstreetmap.org/";
    private readonly defaultCountryQuery = "Polska";
    private isNominatimAvailable = false;

    public constructor(
        private httpService: HttpService
    ) {
        this.updateIsNominatimAvailableFlag();
    }

    public async updateIsNominatimAvailableFlag(): Promise<void> {
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

    public async searchLocationsByQuery(query: string): Promise<FindMeLocationSearchByQueryResultDto[]> {
        if (!this.isNominatimAvailable) {
            throw new InternalServerErrorException([ ErrorMessagesConstants.NOMINATIM_SERVICE_UNREACHABLE ]);
        }
        const res = await firstValueFrom(this.httpService.get(this.nominatimRootUrl + "/search", {
            params: {
                q: query,
                country: this.defaultCountryQuery,
                format: "jsonv2",
                limit: 5,
            },
        }));

        return res.data.map(i => ({
            name: i.display_name,
            lat: +i.lat,
            lon: +i.lon,
        }));
    }

    public async searchLocationsByCoordinates(
        lat: number,
        lon: number
    ): Promise<FindMeLocationSearchByQueryResultDto> {
        if (!this.isNominatimAvailable) {
            throw new InternalServerErrorException([ ErrorMessagesConstants.NOMINATIM_SERVICE_UNREACHABLE ]);
        }
        const res = await firstValueFrom(this.httpService.get(this.nominatimRootUrl + "/reverse", {
            params: {
                lat,
                lon,
                zoom: 10,
                format: "jsonv2",
            },
        }));

        return {
            name: res.data.display_name,
            lat: +res.data.lat,
            lon: +res.data.lon,
        };
    }
}
