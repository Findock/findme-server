import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { FindMeLocationSearchByQueryResultDto }
    from "@/find-me-location/dto/find-me-lication-search-by-query-result.dto";
import { FindMeLocationSearchByCoordinatesDto }
    from "@/find-me-location/dto/find-me-location-search-by-coordinates.dto";
import { FindMeLocationSearchByQueryDto } from "@/find-me-location/dto/find-me-location-search-by-query.dto";
import { FindMeNominatimService } from "@/find-me-location/services/find-me-nominatim-service";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";

@ApiTags(ApiTagsConstants.LOCATION)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.LOCATION)
export class FindMeLocationController {
    public constructor(
        private nominatimService: FindMeNominatimService
    ) { }

    @ApiOperation({
        summary: "Search for locations by location query",
        description: "As a query pass fragment of location name",
    })
    @ApiOkResponse({
        description: "Returns array of matched location objects by query (max 5)",
        type: FindMeLocationSearchByQueryResultDto,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Invalid authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.SEARCH + "/" + PathConstants.BY_QUERY)
    public async searchByQuery(
        @Body() searchByQueryDto: FindMeLocationSearchByQueryDto
    ): Promise<FindMeLocationSearchByQueryResultDto[]> {
        return this.nominatimService.searchLocationsByQuery(searchByQueryDto.query);
    }

    @ApiOperation({
        summary: "Search for location by location coordinates",
        description: "Pass lot and lat coordinates",
    })
    @ApiOkResponse({
        description: "Returns matched location object by coordinates",
        type: FindMeLocationSearchByQueryResultDto,
    })
    @ApiUnauthorizedResponse({
        description: "Invalid authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.SEARCH + "/" + PathConstants.BY_COORDINATES)
    public async searchByCoordinates(
        @Body() searchByCoordinatesDto: FindMeLocationSearchByCoordinatesDto
    ): Promise<FindMeLocationSearchByQueryResultDto> {
        return this.nominatimService.searchLocationsByCoordinates(
            searchByCoordinatesDto.lat,
            searchByCoordinatesDto.lon
        );
    }
}
