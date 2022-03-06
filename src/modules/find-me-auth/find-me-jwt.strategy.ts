import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import envConfig from "@src/config/env.config";
import { FindMeUsersService } from "@src/modules/find-me-users/find-me-users.service";
import { FindMeUserDocument } from "@src/modules/find-me-users/schemas/find-me-user.schema";
import { FindMeAuthService } from "@src/modules/find-me-auth/find-me-auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(
        private readonly authService: FindMeAuthService,
        private readonly usersService: FindMeUsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: envConfig().encryptKey,
        });
    }

    public async validate(req: Request, payload: any): Promise<FindMeUserDocument> {
        const token = req.headers["authorization"];
        if (!await this.authService.validateToken(token)) throw new UnauthorizedException();
        await this.authService.bumpTokenLastUse(token);
        return this.usersService.findOneById(payload._id);
    }
}
