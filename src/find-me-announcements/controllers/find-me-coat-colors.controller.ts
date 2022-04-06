import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeCoatColorsService } from "@/find-me-announcements/services/find-me-coat-colors.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { LookupSearchDto } from "@/find-me-commons/dto/lookup-search.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";

@ApiTags(ApiTagsConstants.COAT_COLORS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.COAT_COLORS)
export class FindMeCoatColorsController {
    public constructor(
        private coatColorsService: FindMeCoatColorsService
    ) { }

    @ApiOperation({
        summary: "Get all coat colors",
        description: "Get array of all coat colors",
    })
    @ApiOkResponse({
        description: "Returns list of all coat colors",
        type: FindMeCoatColor,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getAll(): Promise<FindMeCoatColor[]> {
        return this.coatColorsService.getAllCoatColors();
    }

    @ApiOperation({
        summary: "Search for coat colors",
        description: "Get array of matched coat colors",
    })
    @ApiOkResponse({
        description: "Returns array of matched coat colors",
        type: FindMeCoatColor,
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
    ): Promise<FindMeCoatColor[]> {
        return this.coatColorsService.searchCoatColors(lookupSearchDto.query);
    }
}
