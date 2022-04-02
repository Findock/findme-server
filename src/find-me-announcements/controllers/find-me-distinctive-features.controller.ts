import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeDistinctiveFeaturesService }
    from "@/find-me-announcements/services/find-me-distinctive-features.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { LookupSearchDto } from "@/find-me-commons/dto/lookup-search.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";

@ApiTags(ApiTagsConstants.DISTINCTIVE_FEATURES)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.DISTINCTIVE_FEATURES)
export class FindMeDistinctiveFeaturesController {
    public constructor(
        private distinctiveFeaturesService: FindMeDistinctiveFeaturesService
    ) { }

    @ApiOperation({
        summary: "Get all distinctive features",
        description: "Get array of all distinctive features",
    })
    @ApiOkResponse({
        description: "Returns list of all distinctive features",
        type: FindMeDistinctiveFeature,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getAll(): Promise<FindMeDistinctiveFeature[]> {
        return this.distinctiveFeaturesService.getAllDistinctiveFeatures();
    }

    @ApiOperation({
        summary: "Search for distinctive features",
        description: "Get array of all distinctive features",
    })
    @ApiOkResponse({
        description: "Returns list of matched distinctive features",
        type: FindMeDistinctiveFeature,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.SEARCH)
    public async search(
        @Body() lookupSearchDto: LookupSearchDto
    ): Promise<FindMeDistinctiveFeature[]> {
        return this.distinctiveFeaturesService.searchDistinctiveFeatures(lookupSearchDto.query);
    }
}
