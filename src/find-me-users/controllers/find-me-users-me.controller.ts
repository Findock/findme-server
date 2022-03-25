import { BadRequestException, Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "@/find-me-auth/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-auth/guards/find-me-jwt-auth.guard";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { SuccessMessagesConstants } from "@/find-me-commons/constants/success-messages.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { OkMessageDto } from "@/find-me-commons/dto/ok-message.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { GetFindMeUserDto } from "@/find-me-users/dto/get-find-me-user.dto";
import { UpdateFindMeUserDto } from "@/find-me-users/dto/update-find-me-user.dto";
import { UpdateFindMeUserPasswordDto } from "@/find-me-users/dto/update-find-me-user-password.dto";
import { FindMeUser, FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";
import { FindMeUsersAnonymizeService } from "@/find-me-users/services/find-me-users-anonymize.service";
import { FindMeUsersProfileImagesService } from "@/find-me-users/services/find-me-users-profile-images.service";

@ApiTags(ApiTagsConstants.USERS_ME)
@Controller(PathConstants.USERS + "/" + PathConstants.ME)
export class FindMeUsersMeController {
    public constructor(
        private readonly usersService: FindMeUsersService,
        private readonly usersAnonymizeService: FindMeUsersAnonymizeService,
        private readonly findMeUsersProfileImagesService: FindMeUsersProfileImagesService,
    ) { }

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
    @Get()
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
    @ApiBadRequestResponse({
        description: "Form validation errors",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put()
    public async updateMe(
        @CurrentUser() user: FindMeUserDocument,
        @Body() updateDto: UpdateFindMeUserDto
    ): Promise<FindMeUser> {
        return this.usersService.updateUser(user._id, updateDto);
    }

    @ApiOperation({
        summary: "Removes and anonymize authorized user account information",
        description: "You can do it only once and operation is !IRREVERSABLE!",
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
    @Delete()
    public async deleteMe(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<OkMessageDto> {
        if (user.email === "") throw new BadRequestException([ ErrorMessagesConstants.ACCOUNT_IS_ALREADY_DELETED ]);
        this.usersAnonymizeService.anonymizeUserData(user._id);
        return { message: SuccessMessagesConstants.USER_ACCOUNT_REMOVED };
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
    @Delete(PathConstants.PROFILE_IMAGE)
    public async removeMyProfileImage(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<FindMeUser> {
        return this.findMeUsersProfileImagesService.removeUserProfileImage(user._id);
    }

    @ApiOperation({
        summary: "Updates authorized user password",
        description: "Requires old password and new password to update user password",
    })
    @ApiOkResponse({
        description: "Returns updated user object",
        type: GetFindMeUserDto,
    })
    @ApiBadRequestResponse({
        description: "Invalid old password parameter or form validation errors",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.UPDATE_PASSWORD)
    public async updateMyPassword(
        @Body() updateFindMeUserPasswordDto: UpdateFindMeUserPasswordDto,
        @CurrentUser() user: FindMeUserDocument
    ): Promise<FindMeUser> {
        const { oldPassword, newPassword } = updateFindMeUserPasswordDto;
        return this.usersService.updateUserPassword(
            user._id,
            oldPassword,
            newPassword
        );
    }
}