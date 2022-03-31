import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { envConfig } from "@/find-me-commons/configurations/env.config";
import { FindMeAuthService } from "@/find-me-security/services/find-me-auth.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(
        private authService: FindMeAuthService,
        private usersService: FindMeUsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: envConfig().encryptKey,
        });
    }

    public async validate(req: Request, payload: {
        id: number
    }): Promise<FindMeUser> {
        const token = req.headers["authorization"];
        if (!await this.authService.validateToken(token)) throw new UnauthorizedException();
        await this.authService.bumpTokenLastUse(token);
        return this.usersService.findOneById(payload.id);
    }
}
