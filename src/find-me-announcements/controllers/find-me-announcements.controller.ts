import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller, Get, Param, Post,
    Put,
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
import { SearchFindMeAnnouncementDto } from "@/find-me-announcements/dto/search-find-me-announcement.dto";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementsService } from "@/find-me-announcements/services/find-me-announcements.service";
import { FindMeFavoriteAnnouncementsService }
    from "@/find-me-announcements/services/find-me-favorite-announcements.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@ApiTags(ApiTagsConstants.ANNOUNCEMENTS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.ANNOUNCEMENTS)
export class FindMeAnnouncementsController {
    public constructor(
        private announcementsService: FindMeAnnouncementsService,
        private favoriteAnnouncementsService: FindMeFavoriteAnnouncementsService,
        private usersService: FindMeUsersService
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
        description: "You can narrow result to using announcements filters",
    })
    @ApiOkResponse({
        description: "Returns array of user created announcements",
        type: FindMeAnnouncement,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.MY + "/" + PathConstants.SEARCH)
    public async searchUserAnnouncements(
        @CurrentUser() user: FindMeUser,
        @Body() searchDto: SearchFindMeAnnouncementDto
    ): Promise<GetFindMeAnnouncementDto[]> {
        const announcements = await this.announcementsService.searchUserAnnouncements(user, searchDto);
        return Promise.all(announcements.map(async announcement => ({
            ...announcement,
            isInFavorites: await this.favoriteAnnouncementsService.isAnnouncementInUserFavorites(announcement, user),
            isUserCreator: true,
        })));
    }

    @ApiOperation({
        summary: "Get other user created announcements by user ID",
        description: "You can narrow result to using announcements filters",
    })
    @ApiOkResponse({
        description: "Returns array of other user created announcements",
        type: FindMeAnnouncement,
        isArray: true,
    })
    @ApiBadRequestResponse({
        description: "User with provided id does not exist",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.OTHER + PathConstants.ID_PARAM + "/" + PathConstants.SEARCH)
    public async searchOtherUserAnnouncements(
        @CurrentUser() user: FindMeUser,
        @Param("id") id: number,
        @Body() searchDto: SearchFindMeAnnouncementDto
    ): Promise<GetFindMeAnnouncementDto[]> {
        const otherUser = await this.usersService.findOneById(id);
        if (!otherUser) throw new BadRequestException([ ErrorMessagesConstants.USER_WITH_THIS_ID_DOES_NOT_EXIST ]);
        const announcements = await this.announcementsService.searchUserAnnouncements(otherUser, searchDto);
        return Promise.all(announcements.map(async announcement => ({
            ...announcement,
            isInFavorites: await this.favoriteAnnouncementsService.isAnnouncementInUserFavorites(announcement, user),
            isUserCreator: announcement.creator.id === user.id,
        })));
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
        const isInFavorites = await this.favoriteAnnouncementsService.isAnnouncementInUserFavorites(announcement, user);
        return {
            ...announcement,
            isUserCreator,
            isInFavorites,
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
