import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import errorMessagesConstants from '@src/constants/error-messages.constants';
import { AuthTokenDto } from '@src/modules/find-me-auth/dto/auth-token.dto';
import { AuthLoginDto } from '@src/modules/find-me-auth/dto/auth-login.dto';
import { FindMeSecurityService } from '@src/modules/find-me-security/find-me-security.service';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';

@Injectable()
export class FindMeAuthService {

    constructor(
        private securityService: FindMeSecurityService,
        private usersService: FindMeUsersService,
        private jwtService: JwtService
    ) {}

    public async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException([ errorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST ]);
        }
        if (this.securityService.encryptValue(password) !== user.password) {
            throw new UnauthorizedException([ errorMessagesConstants.WRONG_PASSWORD ]);
        }
        return user;
    }

    public async login(loginDto: AuthLoginDto): Promise<AuthTokenDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        return {
            access_token: this.jwtService.sign(user._id.toString()),
            token_type: 'Bearer',
        };
    }
}

