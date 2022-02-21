import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import errorMessagesConstants from '@src/constants/error-messages.constants';
import pathConstants from '@src/constants/path.constants';
import ErrorExceptionDto from '@src/dto/error-exception.dto';
import { AuthTokenDto } from '@src/modules/find-me-auth/dto/auth-token.dto';
import { LoginDto } from '@src/modules/find-me-auth/dto/login.dto';
import { FindMeAuthService } from '@src/modules/find-me-auth/find-me-auth.service';
import { CurrentUser } from '@src/modules/find-me-auth/find-me-current-user.decorator';
import { JwtAuthGuard } from '@src/modules/find-me-auth/find-me-jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class FindMeAuthController {

    constructor(
        private readonly authService: FindMeAuthService
    ) {}

    @ApiOperation({
        summary: 'Generate authorization token / login user',
        description: 'Only allows token generation when valid credentials are provided',
    })
    @ApiOkResponse({
        description: 'Returns authorization token',
        type: AuthTokenDto,
    })
    @ApiUnauthorizedResponse({
        description: `'${errorMessagesConstants.WRONG_PASSWORD}' / '${errorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST}'`,
        type: ErrorExceptionDto,
    })
    @Post(pathConstants.LOGIN)
    public async login(
        @Body() loginDto: LoginDto
    ): Promise<AuthTokenDto> {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/asd')
    public asd(
        @CurrentUser() user
    ) {
        return user;
    }
}
