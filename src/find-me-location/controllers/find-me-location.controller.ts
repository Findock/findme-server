import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { FindMeLocationSearchByQueryResultDto }
    from "@/find-me-location/dto/find-me-lication-search-by-query-result.dto";
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
        description: "Returns array of matched location objects (max 10)",
        type: FindMeLocationSearchByQueryResultDto,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Invalid authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.SEARCH + "/" + PathConstants.LOCATION_BY_QUERY)
    public async search(
        @Body() searchByQueryDto: FindMeLocationSearchByQueryDto
    ): Promise<FindMeLocationSearchByQueryResultDto[]> {
        return this.nominatimService.searchLocationsByQuery(searchByQueryDto.query);
    }
}
