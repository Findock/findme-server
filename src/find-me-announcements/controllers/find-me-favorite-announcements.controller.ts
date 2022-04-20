import { ClassSerializerInterceptor, Controller, Delete, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiOkResponse, ApiOperation, ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { FindMeAnnouncementsService } from "@/find-me-announcements/services/find-me-announcements.service";
import { FindMeFavoriteAnnouncementsService }
    from "@/find-me-announcements/services/find-me-favorite-announcements.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { SuccessMessagesConstants } from "@/find-me-commons/constants/success-messages.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { OkMessageDto } from "@/find-me-commons/dto/ok-message.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.ANNOUNCEMENTS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.ANNOUNCEMENTS + "/" + PathConstants.FAVORITES)
export class FindMeFavoriteAnnouncementsController {
    public constructor(
        private favoriteAnnouncementsService: FindMeFavoriteAnnouncementsService,
        private announcementsService: FindMeAnnouncementsService
    ) { }

    @ApiOperation({
        summary: "Add announcement to user favorites by announcement id",
        description: "Add announcement to user favorites by announcement id",
    })
    @ApiOkResponse({
        description: "Adds and returns ok response",
        type: OkMessageDto,
        isArray: true,
    })
    @ApiBadRequestResponse({
        description: "Announcement does not exists / announcement is already in favorites",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.ADD + PathConstants.ID_PARAM)
    public async addAnnouncementToFavorites(
        @CurrentUser() user: FindMeUser,
        @Param("id") announcementId: number
    ): Promise<OkMessageDto> {
        const announcement = await this.announcementsService.getAnnouncementById(announcementId);
        await this.favoriteAnnouncementsService.addAnnouncementToUserFavorites(
            announcement,
            user
        );
        return { message: SuccessMessagesConstants.ANNOUNCEMENT_ADDED_TO_FAVORITES };
    }

    @ApiOperation({
        summary: "Remove announcement from user favorites by announcement id",
        description: "Remove announcement from user favorites by announcement id",
    })
    @ApiOkResponse({
        description: "Removes and returns ok response",
        type: OkMessageDto,
        isArray: true,
    })
    @ApiBadRequestResponse({
        description: "Announcement does not exists / announcement is not in favorites",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(PathConstants.REMOVE + PathConstants.ID_PARAM)
    public async removeAnnouncementFromFavorites(
        @CurrentUser() user: FindMeUser,
        @Param("id") announcementId: number
    ): Promise<OkMessageDto> {
        const announcement = await this.announcementsService.getAnnouncementById(announcementId);
        await this.favoriteAnnouncementsService.removeAnnouncementFromUserFavorites(
            announcement,
            user
        );
        return { message: SuccessMessagesConstants.ANNOUNCEMENT_REMOVED_FROM_FAVORITES };
    }
}
