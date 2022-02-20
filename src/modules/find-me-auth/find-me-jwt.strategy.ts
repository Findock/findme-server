import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import envConfig from '@src/config/env.config';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: FindMeUsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envConfig().encryptKey,
        });
    }

    async validate(payload: any) {
        return await this.usersService.findOneById(payload);
    }
}
