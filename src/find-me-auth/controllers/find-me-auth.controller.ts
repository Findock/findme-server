import {
    BadRequestException,
    Body, Controller, Delete, Get, Param, Post, Request, UnauthorizedException, UseGuards,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CurrentUser } from "@src/find-me-auth/decorators/find-me-current-user.decorator";
import { AuthLoginDto } from "@src/find-me-auth/dto/auth-login.dto";
import { AuthTokenDto } from "@src/find-me-auth/dto/auth-token.dto";
import { UserAuthTokensDto } from "@src/find-me-auth/dto/user-auth-tokens";
import { JwtAuthGuard } from "@src/find-me-auth/guards/find-me-jwt-auth.guard";
import { FindMeAuthService } from "@src/find-me-auth/services/find-me-auth.service";
import errorMessagesConstants from "@src/find-me-commons/constants/error-messages.constants";
import pathConstants from "@src/find-me-commons/constants/path.constants";
import successMessagesConstants from "@src/find-me-commons/constants/success-messages.constants";
import BadRequestExceptionDto from "@src/find-me-commons/dto/bad-request-exception.dto";
import OkMessageDto from "@src/find-me-commons/dto/ok-message.dto";
import UnauthorizedExceptionDto from "@src/find-me-commons/dto/unauthorized-exception.dto";
import { FindMeUserDocument } from "@src/find-me-users/schemas/find-me-user.schema";

@ApiTags("auth")
@Controller(pathConstants.AUTH)
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
        description: `'${errorMessagesConstants.WRONG_PASSWORD}' / 
            '${errorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST}'`,
        type: UnauthorizedExceptionDto,
    })
    @Post(pathConstants.LOGIN)
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
        description: "Authorization token was successfully removed from dadabase and user is now logged out",
        type: OkMessageDto,
    })
    @ApiUnauthorizedResponse({
        description: "Authorization token is not valid",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(pathConstants.LOGOUT)
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
    @Get(pathConstants.VALIDATE_TOKEN)
    public async validateToken(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<OkMessageDto> {
        if (!user) throw new UnauthorizedException();
        return { message: successMessagesConstants.TOKEN_IS_VALID };
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
    @Get(pathConstants.MY_AUTH_TOKENS)
    public async myActiveTokens(
        @CurrentUser() user: FindMeUserDocument
    ): Promise<UserAuthTokensDto> {
        return { authTokens: await this.authService.getAuthTokensForUser(user._id) };
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
    @Delete(pathConstants.AUTH_TOKEN + pathConstants.ID_PARAM)
    public async removeAuthToken(
        @Param("id") id: string,
        @CurrentUser() user: FindMeUserDocument
    ): Promise<OkMessageDto> {
        if (!id || typeof id !== "string") throw new BadRequestException();
        await this.authService.removeAuthTokenByIdForUser(id, user);
        return { message: successMessagesConstants.TOKEN_REMOVED };
    }
}
