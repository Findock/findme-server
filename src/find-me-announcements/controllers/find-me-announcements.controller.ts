import {
    Body, ClassSerializerInterceptor,
    Controller, Get, Param, Post,
    Put,
    Query,
    UseGuards, UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiNotFoundResponse,
    ApiOkResponse, ApiOperation,
    ApiTags, ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CreateFindMeAnnouncementDto } from "@/find-me-announcements/dto/create-find-me-announcement.dto";
import { GetFindMeAnnouncementDto } from "@/find-me-announcements/dto/get-find-me-announcement-dto";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementsService } from "@/find-me-announcements/services/find-me-announcements.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
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
    @ApiNotFoundResponse({
        description: "Form validation error array",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
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

    @ApiOperation({
        summary: "Get user created announcements",
        description: "You can narrow result to only active announcements",
    })
    @ApiOkResponse({
        description: "Returns array of user created announcement",
        type: FindMeAnnouncement,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.MY)
    public async searchUserAnnouncements(
        @CurrentUser() user: FindMeUser,
        @Query("onlyActive") onlyActive: "true" | "false"
    ): Promise<FindMeAnnouncement[]> {
        if (onlyActive === "true") {
            return this.announcementsService.getActiveUserAnnouncements(user);
        } else {
            return this.announcementsService.getAllUserAnnouncements(user);
        }
    }

    @ApiOperation({
        summary: "Get one announcement by id",
        description: "Get announcement data object with is user creator flag",
    })
    @ApiOkResponse({
        description: "Returns announcement object",
        type: GetFindMeAnnouncementDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBadRequestResponse({
        description: "Announcement does not exit",
        type: BadRequestExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.GET + PathConstants.ID_PARAM)
    public async getAnnouncement(
        @Param("id") announcementId: number,
        @CurrentUser() user: FindMeUser
    ): Promise<GetFindMeAnnouncementDto> {
        const announcement = await this.announcementsService.getAnnouncementById(announcementId);
        const isUserCreator = await this.announcementsService.isUserCreatorOfAnnouncement(user, announcement);
        return {
            ...announcement,
            isUserCreator,
        };
    }

    @ApiOperation({
        summary: "Update announcement by id",
        description: "Update user created announcement",
    })
    @ApiOkResponse({
        description: "Returns updated announcement object",
        type: GetFindMeAnnouncementDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token / user is not authorized to edit this announcement",
        type: UnauthorizedExceptionDto,
    })
    @ApiBadRequestResponse({
        description: "Announcement does not exit",
        type: BadRequestExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(PathConstants.UPDATE + PathConstants.ID_PARAM)
    public async updateAnnouncement(
        @Param("id") announcementId: number,
        @CurrentUser() user: FindMeUser,
        @Body() updateDto: CreateFindMeAnnouncementDto
    ): Promise<FindMeAnnouncement> {
        return this.announcementsService.updateAnnouncementById(announcementId, user, updateDto);
    }
}
