import {
    Body, ClassSerializerInterceptor,
    Controller, Get, Param,
    Post, UseGuards, UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse, ApiOperation,
    ApiTags, ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementsService } from "@/find-me-announcements/services/find-me-announcements.service";
import { CreateFindMeCommentDto } from "@/find-me-comments/dto/create-find-me-comment.dto";
import { GetFindMeCommentDto } from "@/find-me-comments/dto/get-find-me-comment.dto";
import { FindMeComment } from "@/find-me-comments/entities/find-me-comment.entity";
import { FindMeCommentsService } from "@/find-me-comments/services/find-me-comments.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.COMMENTS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.COMMENTS)
export class FindMeCommentsController {
    public constructor(
        private commentsService: FindMeCommentsService,
        private announcementsService: FindMeAnnouncementsService
    ) { }

    @ApiOperation({
        summary: "Create new announcement comment",
        description: "Creates new announcement comment and returns it",
    })
    @ApiOkResponse({
        description: "Successfully created announcement comment",
        type: FindMeComment,
    })
    @ApiBadRequestResponse({
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
        @Body() createDto: CreateFindMeCommentDto
    ): Promise<FindMeComment> {
        return this.commentsService.createComment(
            user,
            createDto
        );
    }

    @ApiOperation({
        summary: "Get announcement comments to announcement by announcement id",
        description: "Returns announcement comments array",
    })
    @ApiOkResponse({
        description: "Returns announcement comments array",
        type: FindMeComment,
        isArray: true,
    })
    @ApiBadRequestResponse({
        description: "Announcement with provided ID does not exist",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.TO_ANNOUNCEMENT + PathConstants.ID_PARAM)
    public async getCommentsToAnnouncement(
        @Param("id") announcementId: number,
        @CurrentUser() user: FindMeUser
    ): Promise<GetFindMeCommentDto[]> {
        const announcement = await this.announcementsService.getAnnouncementById(announcementId);
        const comments = await this.commentsService.getCommentsToAnnouncement(announcement);

        return this.parseCommentObjectsToDto(comments, announcement, user);
    }

    private async parseCommentObjectsToDto(
        comments: FindMeComment[],
        commentedAnnouncement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<GetFindMeCommentDto[]> {
        return Promise.all(comments.map(async comment =>
            this.parseCommentObjectToDto(comment, commentedAnnouncement, user)));
    }

    private async parseCommentObjectToDto(
        comment: FindMeComment,
        commentedAnnouncement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<GetFindMeCommentDto> {
        const isUserCreator = comment.creator.id === user.id;
        const isUserCreatorOfCommentedAnnouncement = commentedAnnouncement.creator.id === user.id;
        return {
            ...comment,
            isUserCreator,
            canEdit: isUserCreator || isUserCreatorOfCommentedAnnouncement,
        };
    }
}
