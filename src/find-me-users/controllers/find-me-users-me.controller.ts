import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller, Delete, Get, Post, Put,
    UploadedFile,
    UseGuards, UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { SuccessMessagesConstants } from "@/find-me-commons/constants/success-messages.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { OkMessageDto } from "@/find-me-commons/dto/ok-message.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeStorageProfileImageInterceptor }
    from "@/find-me-storage/interceptors/find-me-storage-profile-image.interceptor";
import { UpdateFindMeUserDto } from "@/find-me-users/dto/update-find-me-user.dto";
import { UpdateFindMeUserPasswordDto } from "@/find-me-users/dto/update-find-me-user-password.dto";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";
import { FindMeUsersAnonymizeService } from "@/find-me-users/services/find-me-users-anonymize.service";
import { FindMeUsersProfileImagesService } from "@/find-me-users/services/find-me-users-profile-images.service";

@ApiTags(ApiTagsConstants.USERS_ME)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.USERS + "/" + PathConstants.ME)
export class FindMeUsersMeController {
    public constructor(
        private usersService: FindMeUsersService,
        private usersAnonymizeService: FindMeUsersAnonymizeService,
        private findMeUsersProfileImagesService: FindMeUsersProfileImagesService,
        private usersProfileImagesService: FindMeUsersProfileImagesService
    ) { }

    @ApiOperation({
        summary: "Get authorized user account information",
        description: "You can access user information via authorization token",
    })
    @ApiOkResponse({
        description: "Returns authorized user object",
        type: FindMeUser,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    public async getMe(
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeUser> {
        return user;
    }

    @ApiOperation({
        summary: "Update authorized user account information",
        description: "You can update only authorized user information",
    })
    @ApiOkResponse({
        description: "Returns updated user object",
        type: FindMeUser,
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
        @CurrentUser() user: FindMeUser,
        @Body() updateDto: UpdateFindMeUserDto
    ): Promise<FindMeUser> {
        return this.usersService.updateUser(user, updateDto);
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
        @CurrentUser() user: FindMeUser
    ): Promise<OkMessageDto> {
        if (user.email === "") throw new BadRequestException([ ErrorMessagesConstants.ACCOUNT_IS_ALREADY_DELETED ]);
        this.usersAnonymizeService.anonymizeUserData(user);
        return { message: SuccessMessagesConstants.USER_ACCOUNT_REMOVED };
    }

    @ApiOperation({
        summary: "Removes user profile image",
        description: "Removes user profile image and returns updated user object",
    })
    @ApiOkResponse({
        description: "Returns ok message",
        type: FindMeUser,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(PathConstants.PROFILE_IMAGE)
    public async removeMyProfileImage(
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeUser> {
        return this.findMeUsersProfileImagesService.removeUserProfileImage(user);
    }

    @ApiOperation({
        summary: "Updates authorized user password",
        description: "Requires old password and new password to update user password",
    })
    @ApiOkResponse({
        description: "Returns updated user object",
        type: FindMeUser,
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
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeUser> {
        const { oldPassword, newPassword } = updateFindMeUserPasswordDto;
        return this.usersService.updateUserPassword(
            user,
            oldPassword,
            newPassword
        );
    }

    @ApiOperation({
        summary: "Upload new profile image for user",
        description: "Uploads and then updates user profile image url in user object",
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @ApiCreatedResponse({
        description: "Image was uploaded and returns updated user object",
        type: FindMeUser,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseInterceptors(FindMeStorageProfileImageInterceptor)
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.PROFILE_IMAGE)
    public async uploadNewProfileImageForUser(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeUser> {
        return this.usersProfileImagesService.updateUserProfileImage(user, file.path);
    }
}
