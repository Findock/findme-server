import {
    BadRequestException,
    Body, ClassSerializerInterceptor, Controller,
    Delete, Get, Param, Post, Request,
    UnauthorizedException, UseGuards, UseInterceptors,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { SuccessMessagesConstants } from "@/find-me-commons/constants/success-messages.constants";
import { BadRequestExceptionDto } from "@/find-me-commons/dto/bad-request-exception.dto";
import { OkMessageDto } from "@/find-me-commons/dto/ok-message.dto";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { AuthLoginDto } from "@/find-me-security/dto/auth-login.dto";
import { AuthTokenDto } from "@/find-me-security/dto/auth-token.dto";
import { PasswordResetByTokenDto } from "@/find-me-security/dto/password-reset-by-token.dto";
import { PasswordResetRequestDto } from "@/find-me-security/dto/password-reset-request.dto";
import { UserAuthTokensDto } from "@/find-me-security/dto/user-auth-tokens";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeAuthService } from "@/find-me-security/services/find-me-auth.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.AUTH)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.AUTH)
export class FindMeAuthController {

    public constructor(
        private readonly authService: FindMeAuthService
    ) {}

    @ApiOperation({
        summary: "Generate new user authorization token",
        description: "Only allows token generation when valid credentials are provided",
    })
    @ApiOkResponse({
        description: "Returns authorization token",
        type: AuthTokenDto,
    })
    @ApiBadRequestResponse({
        description: "Wrong login form / incorrect form sanitization / bad credentials",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: `'${ErrorMessagesConstants.WRONG_PASSWORD}' /
            '${ErrorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST}'`,
        type: UnauthorizedExceptionDto,
    })
    @Post(PathConstants.LOGIN)
    public async login(
        @Body() loginDto: AuthLoginDto
    ): Promise<AuthTokenDto> {
        return this.authService.login(loginDto);
    }

    @ApiOperation({
        summary: "Logout user and remove used authorization token",
        description: "You need to logout user to prevent login history dump",
    })
    @ApiOkResponse({
        description: "Authorization token was successfully removed from database and user is now logged out",
        type: OkMessageDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(PathConstants.LOGOUT)
    public async logout(
        @Request() req: Request
    ): Promise<OkMessageDto> {
        this.authService.logout(req.headers["authorization"]);
        return { message: "User was successfully logged out." };
    }

    @ApiOperation({
        summary: "Validate user authorization token",
        description: "Check if user authorization token is valid or not",
    })
    @ApiOkResponse({
        description: "Authorization token is valid",
        type: OkMessageDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.VALIDATE_TOKEN)
    public async validateToken(
        @CurrentUser() user: FindMeUser
    ): Promise<OkMessageDto> {
        if (!user) throw new UnauthorizedException();
        return { message: SuccessMessagesConstants.TOKEN_IS_VALID };
    }

    @ApiOperation({
        summary: "Get list of all user authorization tokens",
        description: "Gets list of all user authorization tokens (valid and invalidated)",
    })
    @ApiOkResponse({
        description: "Returns active authorization tokens of user",
        type: UserAuthTokensDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(PathConstants.MY_AUTH_TOKENS)
    public async myActiveTokens(
        @CurrentUser() user: FindMeUser
    ): Promise<UserAuthTokensDto> {
        return { authTokens: await this.authService.getAuthTokensForUser(user) };
    }

    @ApiOperation({
        summary: "Invalidate authorization token for user by token id",
        description: "Invalidate user authorization token - user can only remove token he created",
    })
    @ApiOkResponse({
        description: "Returns active authorization tokens of user",
        type: OkMessageDto,
    })
    @ApiBadRequestResponse({
        description: "Token does not exists / token is inactive / bad token Id",
        type: BadRequestExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(PathConstants.AUTH_TOKEN + PathConstants.ID_PARAM)
    public async removeAuthToken(
        @Param("id") id: string,
        @CurrentUser() user: FindMeUser
    ): Promise<OkMessageDto> {
        if (!id || typeof id !== "string") throw new BadRequestException();
        await this.authService.removeAuthTokenByIdForUser(id, user);
        return { message: SuccessMessagesConstants.TOKEN_REMOVED };
    }

    @ApiOperation({
        summary: "Generates new reset password link (and token) then sends email with it",
        description: "You can send emails only for accounts which exist in application",
    })
    @ApiOkResponse({
        description: "Sends email and returns ok message",
        type: OkMessageDto,
    })
    @ApiBadRequestResponse({
        description: "User with this email address was not found - email is not sent",
        type: BadRequestExceptionDto,
    })
    @Post(PathConstants.SEND_RESET_PASSWORD_EMAIL)
    public async sendPasswordResetLinkEmail(
        @Body() passwordResetRequestDto: PasswordResetRequestDto
    ): Promise<OkMessageDto> {
        const { email } = passwordResetRequestDto;
        this.authService.sendResetPasswordLink(email);
        return { message: "Email with password reset link successfully sent!" };
    }

    @ApiOperation({
        summary: "Reset user password by password reset token",
        description: "After password reset password reset token is deleted",
    })
    @ApiOkResponse({
        description: "Password successfully set to new password",
        type: OkMessageDto,
    })
    @ApiBadRequestResponse({
        description: "Bad password reset token",
        type: BadRequestExceptionDto,
    })
    @Post(PathConstants.RESET_PASSWORD)
    public async resetUserPasswordByResetToken(
        @Body() passwordResetByTokenDto: PasswordResetByTokenDto
    ): Promise<OkMessageDto> {
        const { token, newPassword } = passwordResetByTokenDto;
        await this.authService.resetUserPasswordWithToken(token, newPassword);
        return { message: "Password was successfully changed" };
    }
}
