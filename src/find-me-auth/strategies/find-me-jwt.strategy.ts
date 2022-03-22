import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { FindMeAuthService } from "@src/find-me-auth/services/find-me-auth.service";
import envConfig from "@src/find-me-commons/configurations/env.config";
import { FindMeUserDocument } from "@src/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersService } from "@src/find-me-users/services/find-me-users.service";
import { ExtractJwt, Strategy } from "passport-jwt";

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

    public async validate(req: Request, payload: {
        _id: string
    }): Promise<FindMeUserDocument> {
        const token = req.headers["authorization"];
        if (!await this.authService.validateToken(token)) throw new UnauthorizedException();
        await this.authService.bumpTokenLastUse(token);
        const user = await this.usersService.findOneById(payload._id);
        delete (user as any)._doc.password;
        return user;
    }
}
