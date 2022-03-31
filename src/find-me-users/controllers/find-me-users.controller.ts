import {
    Body, ClassSerializerInterceptor,
    Controller, Get, Param, Post,
    UseGuards, UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { ErrorExceptionDto } from "@/find-me-commons/dto/error-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { CreateFindMeUserDto } from "@/find-me-users/dto/create-find-me-user.dto";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";
import { FindMeUsersAccessLogService } from "@/find-me-users/services/find-me-users-access-log.service";

@ApiTags(ApiTagsConstants.USERS)
@Controller(PathConstants.USERS)
@UseInterceptors(ClassSerializerInterceptor)
export class FindMeUsersController {
    public constructor(
        private readonly usersService: FindMeUsersService,
        private readonly usersAccessLogService: FindMeUsersAccessLogService
    ) { }

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
    ): Promise<FindMeUser> {
        return this.usersService.createUser(createFindMeUserDto);
    }

    @ApiOperation({
        summary: "Get other find me user data",
        description: "Returns other find me user data",
    })
    @ApiOkResponse({
        description: "Returns user object",
        type: FindMeUser,
    })
    @ApiBadRequestResponse({
        description: "User does not exists",
        type: BadRequestExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.OTHER + PathConstants.ID_PARAM)
    public async getUser(
        @Param("id") userId: number,
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeUser> {
        const otherUser = await this.usersService.findOneById(userId);
        if (otherUser.id !== user.id) {
            this.usersAccessLogService.logUserAccessByAnotherUser(
                otherUser,
                user
            );
        }
        return otherUser;
    }
}
