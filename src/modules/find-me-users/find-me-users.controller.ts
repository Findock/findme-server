import { BadRequestException, Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import pathConstants from "@src/constants/path.constants";
import { FindMeUsersService } from "@src/modules/find-me-users/find-me-users.service";
import { CreateFindMeUserDto } from "@src/modules/find-me-users/dto/create-find-me-user.dto";
import { FindMeUser, FindMeUserDocument } from "@src/modules/find-me-users/schemas/find-me-user.schema";
import ErrorExceptionDto from "@src/dto/error-exception.dto";
import { JwtAuthGuard } from "@src/modules/find-me-auth/find-me-jwt-auth.guard";
import { CurrentUser } from "@src/modules/find-me-auth/find-me-current-user.decorator";
import UnauthorizedExceptionDto from "@src/dto/unauthorized-exception.dto";
import { GetFindMeUserDto } from "@src/modules/find-me-users/dto/get-find-me-user.dto";
import BadRequestExceptionDto from "@src/dto/bad-request-exception.dto";
import { UpdateFindMeUserDto } from "@src/modules/find-me-users/dto/update-find-me-user.dto";
import OkMessageDto from "@src/dto/ok-message.dto";
import successMessagesConstants from "@src/constants/success-messages.constants";
import errorMessagesConstants from "@src/constants/error-messages.constants";

@ApiTags("users")
@Controller(pathConstants.USERS)
export class FindMeUsersController {
    public constructor(
        private readonly usersService: FindMeUsersService
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
        summary: "Get authorized user account information",
        description: "You can access user information via authorization token",
    })
    @ApiOkResponse({
        description: "Returns authorized user object",
        type: GetFindMeUserDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(pathConstants.ME)
    public async getMe(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<FindMeUserDocument> {
        return user;
    }

    @ApiOperation({
        summary: "Update authorized user account information",
        description: "You can update only authorized user information",
    })
    @ApiOkResponse({
        description: "Returns updated user object",
        type: GetFindMeUserDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(pathConstants.ME)
    public async updateMe(
        @CurrentUser() user: FindMeUserDocument,
        @Body() updateDto: UpdateFindMeUserDto
    ): Promise<FindMeUser> {
        return this.usersService.updateUser(user._id, updateDto);
    }

    @ApiOperation({
        summary: "Removes and anonymizes authorized user account information",
        description: "You can do it only once and operation is IRREVERSABLE",
    })
    @ApiOkResponse({
        description: "Returns ok message",
        type: OkMessageDto,
    })
    @ApiBadRequestResponse({
        description: "User account is already deleted",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(pathConstants.ME)
    public async deleteMe(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<OkMessageDto> {
        if (user.email === "") throw new BadRequestException([ errorMessagesConstants.ACCOUNT_IS_ALREADY_DELETED ]);
        this.usersService.anonymizeUserData(user._id);
        return { message: successMessagesConstants.USER_ACCOUNT_REMOVED };
    }

    @ApiOperation({
        summary: "Removes user profile image",
        description: "Removes user profile image and returns updated user object",
    })
    @ApiOkResponse({
        description: "Returns ok message",
        type: GetFindMeUserDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(pathConstants.ME + "/" + pathConstants.PROFILE_IMAGE)
    public async removeMyProfileImage(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<FindMeUser> {
        return this.usersService.removeUserProfileImage(user._id);
    }
}
