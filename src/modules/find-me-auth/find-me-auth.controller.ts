import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import errorMessagesConstants from "@src/constants/error-messages.constants";
import pathConstants from "@src/constants/path.constants";
import { AuthTokenDto } from "@src/modules/find-me-auth/dto/auth-token.dto";
import { AuthLoginDto } from "@src/modules/find-me-auth/dto/auth-login.dto";
import { FindMeAuthService } from "@src/modules/find-me-auth/find-me-auth.service";
import { CurrentUser } from "@src/modules/find-me-auth/find-me-current-user.decorator";
import { JwtAuthGuard } from "@src/modules/find-me-auth/find-me-jwt-auth.guard";
import successMessagesConstant from "@src/constants/success-messages.constant";
import OkMessageDto from "@src/dto/ok-message.dto";
import UnauthorizedExceptionDto from "@src/dto/unauthorized-exception.dto";
import { UserAuthTokensDto } from "@src/modules/find-me-auth/dto/user-auth-tokens";

@ApiTags("auth")
@Controller(pathConstants.AUTH)
export class FindMeAuthController {

    public constructor(
        private readonly authService: FindMeAuthService
    ) {}

    @ApiOperation({
        summary: "Generate authorization token / login user",
        description: "Only allows token generation when valid credentials are provided",
    })
    @ApiOkResponse({
        description: "Returns authorization token",
        type: AuthTokenDto,
    })
    @ApiUnauthorizedResponse({
        description: `'${errorMessagesConstants.WRONG_PASSWORD}' / '${errorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST}'`,
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
        summary: "Validate authorization token",
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
        @CurrentUser() user
    ): Promise<OkMessageDto> {
        if (!user) throw new UnauthorizedException();
        return { message: successMessagesConstant.TOKEN_IS_VALID };
    }

    @ApiOperation({
        summary: "Validate authorization token",
        description: "Check if user authorization token is valid or not",
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
        @CurrentUser() user
    ): Promise<UserAuthTokensDto> {
        return { authTokens: await this.authService.getAuthTokensForUser(user._id) };
    }
}
