import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

import { CurrentUser } from "@/find-me-auth/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-auth/guards/find-me-jwt-auth.guard";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { ErrorExceptionDto } from "@/find-me-commons/dto/error-exception.dto";
import { CreateFindMeUserDto } from "@/find-me-users/dto/create-find-me-user.dto";
import { GetOtherFindMeUserDto } from "@/find-me-users/dto/get-other-find-me-user.dto";
import { FindMeUser, FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";
import { FindMeUsersAccessLogService } from "@/find-me-users/services/find-me-users-access-log.service";

@ApiTags(ApiTagsConstants.USERS)
@Controller(PathConstants.USERS)
export class FindMeUsersController {
    public constructor(
        private readonly usersService: FindMeUsersService,
        private readonly usersAccessLogService: FindMeUsersAccessLogService
    ) {}

    @ApiOperation({
        summary: "Create new user",
        description: "Only allows to create a new user when email is unique",
    })
    @ApiCreatedResponse({
        description: "User was successfully created",
        type: FindMeUser,
    })
    @ApiBadRequestResponse({
        description: "Not all fields were presented / form validation errors",
        type: BadRequestExceptionDto,
    })
    @ApiConflictResponse({
        description: "User with provided email exists",
        type: ErrorExceptionDto,
    })
    @Post()
    public async createFindMeUser(
        @Body() createFindMeUserDto: CreateFindMeUserDto
    ): Promise<FindMeUserDocument> {
        return this.usersService.createUser(createFindMeUserDto);
    }

    @ApiOperation({
        summary: "Get other find me user data",
        description: "Returns other find me user data",
    })
    @ApiOkResponse({
        description: "Returns user object",
        type: GetOtherFindMeUserDto,
    })
    @ApiBadRequestResponse({
        description: "User does not exists",
        type: BadRequestExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.OTHER + PathConstants.ID_PARAM)
    public async getUser(
        @Param("id") userId: string,
        @CurrentUser() user: FindMeUserDocument
    ): Promise<GetOtherFindMeUserDto> {
        const otherUser = await this.usersService.getOtherUser(userId);
        if (otherUser._id.toString() !== user._id.toString()) {
            this.usersAccessLogService.logUserAccessByAnotherUser(
                otherUser._id,
                user._id
            );
        }
        return otherUser;
    }
}
