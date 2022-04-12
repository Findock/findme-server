import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { CreateFindMeAnnouncementDto } from "@/find-me-announcements/dto/create-find-me-announcement.dto";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementsService } from "@/find-me-announcements/services/find-me-announcements.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.ANNOUNCEMENTS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.ANNOUNCEMENTS)
export class FindMeAnnouncementsController {
    public constructor(
        private announcementsService: FindMeAnnouncementsService
    ) { }

    @ApiOperation({
        summary: "Create new announcement",
        description: "Creates new announcement and returns it",
    })
    @ApiOkResponse({
        description: "Successfully created announcement",
        type: FindMeAnnouncement,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @UseGuards(JwtAuthGuard)
    @Post()
    public async createAnnouncement(
        @CurrentUser() user: FindMeUser,
        @Body() createDto: CreateFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement> {
        return this.announcementsService.createAnnouncement(
            user,
            createDto
        );
    }
}
