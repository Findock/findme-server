import { FindMeAuthToken } from "@src/modules/find-me-auth/schemas/find-me-auth-token.schema";

export class ActiveAuthTokensDto {
    public activeAuthTokens: FindMeAuthToken[];
}
