import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { FindMeLocationController } from "@/find-me-location/controllers/find-me-location.controller";
import { FindMeNominatimService } from "@/find-me-location/services/find-me-nominatim-service";

@Module({
    imports: [ HttpModule ],
    providers: [ FindMeNominatimService ],
    controllers: [ FindMeLocationController ],
})
export class FindMeLocationModule { }
