import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import envConfig from "@src/config/env.config";
import { FindMeUsersService } from "@src/modules/find-me-users/find-me-users.service";
import { FindMeUserDocument } from "@src/modules/find-me-users/schemas/find-me-user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(
        private readonly usersService: FindMeUsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envConfig().encryptKey,
        });
    }

    public async validate(payload: any): Promise<FindMeUserDocument> {
        return this.usersService.findOneById(payload);
    }
}
