import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import errorMessagesConstants from '@src/constants/error-messages.constants';
import { LoginDto } from '@src/modules/find-me-auth/dto/login.dto';
import { FindMeSecurityService } from '@src/modules/find-me-security/find-me-security.service';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';

@Injectable()
export class FindMeAuthService {

    constructor(
        private securityService: FindMeSecurityService,
        private usersService: FindMeUsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && this.securityService.encryptValue(password) === user.password) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) throw new UnauthorizedException(errorMessagesConstants.WRONG_CREDENTIALS);
        return {
            access_token: this.jwtService.sign(user),
            token_type: 'Bearer',
        };
    }
}

