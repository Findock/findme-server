import {
    ClassSerializerInterceptor,
    Controller, Delete, Param, Post,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { FindMeChatArchiveService } from "@/find-me-chat/services/find-me-chat-archive.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { SuccessMessagesConstants } from "@/find-me-commons/constants/success-messages.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { OkMessageDto } from "@/find-me-commons/dto/ok-message.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@ApiTags(ApiTagsConstants.CHAT_ARCHIVE)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.CHAT_ARCHIVE)
export class FindMeCharArchiveController {
    public constructor(
        private chatArchiveService: FindMeChatArchiveService,
        private usersService: FindMeUsersService
    ) { }

    @ApiOperation({
        summary: "Archive chat with user by user id",
        description: "Returns success message",
    })
    @ApiOkResponse({
        description: "Archives chat and returns ok message",
        type: OkMessageDto,
    })
    @ApiBadRequestResponse({
        description: "User with provided id does not exists or chat is already archived",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.ID_PARAM)
    public async archiveChatWithUser(
        @CurrentUser() user: FindMeUser,
        @Param("id") id: number
    ): Promise<OkMessageDto> {
        const archivedUser = await this.usersService.findOneById(id);
        await this.chatArchiveService.archiveChatWithUser(
            user,
            archivedUser
        );
        return { message: SuccessMessagesConstants.CHAT_ARCHIVED };
    }

    @ApiOperation({
        summary: "Remove chat archive with user by user id",
        description: "Returns success message",
    })
    @ApiOkResponse({
        description: "Removes chat archive and returns ok message",
        type: OkMessageDto,
    })
    @ApiBadRequestResponse({
        description: "User with provided id does not exists or chat is not archived",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(PathConstants.ID_PARAM)
    public async removeArchiveChatWithUser(
        @CurrentUser() user: FindMeUser,
        @Param("id") id: number
    ): Promise<OkMessageDto> {
        const archivedUser = await this.usersService.findOneById(id);
        await this.chatArchiveService.removeArchiveChatWithUser(
            user,
            archivedUser
        );
        return { message: SuccessMessagesConstants.CHAT_ARCHIVE_REMOVED };
    }
}
