import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnnouncementCategoriesService }
    from "@/find-me-announcements/services/find-me-announcement-categories.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { LookupSearchDto } from "@/find-me-commons/dto/lookup-search.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";

@ApiTags(ApiTagsConstants.ANNOUNCEMENT_CATEGORIES)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.ANNOUNCEMENT_CATEGORIES)
export class FindMeAnnouncementCategoriesController {
    public constructor(
        private announcementCategoriesService: FindMeAnnouncementCategoriesService
    ) { }

    @ApiOperation({
        summary: "Get all announcement categories",
        description: "Get array of all announcement categories",
    })
    @ApiOkResponse({
        description: "Returns list of all announcement categories",
        type: FindMeAnnouncementCategory,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getAll(): Promise<FindMeAnnouncementCategory[]> {
        return this.announcementCategoriesService.getAllAnnouncementCategories();
    }

    @ApiOperation({
        summary: "Search for announcement categories",
        description: "Get array of matched announcement categories",
    })
    @ApiOkResponse({
        description: "Returns array of matched announcement categories",
        type: FindMeAnnouncementCategory,
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
    ): Promise<FindMeAnnouncementCategory[]> {
        return this.announcementCategoriesService.searchAnnouncementCategories(lookupSearchDto.query);
    }
}
