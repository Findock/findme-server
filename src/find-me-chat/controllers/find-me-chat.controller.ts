import {
    Body, ClassSerializerInterceptor,
    Controller, Get,
    Param, Post, UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CreateFindMeChatMessageDto } from "@/find-me-chat/dto/create-find-me-chat-message.dto";
import { GetFindMeChatListItemDto } from "@/find-me-chat/dto/get-find-me-chat-list-item.dto";
import { FindMeChatMessage } from "@/find-me-chat/entities/find-me-chat-message.entity";
import { FindMeChatService } from "@/find-me-chat/services/find-me-chat.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@ApiTags(ApiTagsConstants.CHAT)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.CHAT)
export class FindMeChatController {
    public constructor(
        private chatService: FindMeChatService,
        private usersService: FindMeUsersService
    ) { }

    @ApiOperation({
        summary: "Create new chat message for user by user id",
        description: "Returns created chat message",
    })
    @ApiOkResponse({
        description: "Creates and returns created chat message",
        type: FindMeChatMessage,
    })
    @ApiBadRequestResponse({
        description: "User with provided id does not exists",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.FOR_USER + PathConstants.ID_PARAM)
    public async createMessageForUser(
        @CurrentUser() user: FindMeUser,
        @Param("id") receiverId: number,
        @Body() createDto: CreateFindMeChatMessageDto
    ): Promise<FindMeChatMessage> {
        const receiver = await this.usersService.findOneById(receiverId);
        return this.chatService.createNewChatMessage(
            user,
            receiver,
            createDto
        );
    }

    @ApiOperation({
        summary: "Get all chat messages with user by user id",
        description: "Returns array of all chat messages with user by user id",
    })
    @ApiOkResponse({
        description: "Returns array of all chat messages",
        type: FindMeChatMessage,
        isArray: true,
    })
    @ApiBadRequestResponse({
        description: "User with provided id does not exists",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.WITH_USER + PathConstants.ID_PARAM)
    public async getMessagesWithUser(
        @CurrentUser() user: FindMeUser,
        @Param("id") receiverId: number
    ): Promise<FindMeChatMessage[]> {
        const receiver = await this.usersService.findOneById(receiverId);
        return this.chatService.getChatMessagesWithUser(user, receiver);
    }

    @ApiOperation({
        summary: "Get user chat list",
        description: "Returns array of chat list objects",
    })
    @ApiOkResponse({
        description: "Returns array of all user chats",
        type: GetFindMeChatListItemDto,
        isArray: true,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getUserMessagesList(
        @CurrentUser() user: FindMeUser,
    ): Promise<GetFindMeChatListItemDto[]> {
        return this.chatService.getUserMessagesList(user);
    }
}
