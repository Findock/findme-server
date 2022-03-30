import { ApiProperty } from "@nestjs/swagger";

import { FindMeAuthToken } from "@/find-me-security/entities/find-me-auth-token.entity";

export class UserAuthTokensDto {
    @ApiProperty({
        example: {
            "authTokens": [
                {
                    "_id": "62249cb367a2c8043e0aee4d",
                    "active": true,
                    "lastUse": "2022-03-06T11:36:42.910Z",
                    "userId": "6219debb9434c4b7adfae813",
                    "localizationDescription": "Cracow, Poland",
                    "deviceName": "Apple iPhone 13 Pro",
                    "__v": 0,
                },
                {
                    "_id": "62249cb367a2c8043e0aee4e",
                    "active": false,
                    "lastUse": "2022-03-05T11:36:42.910Z",
                    "userId": "6219debb9434c4b7adfae813",
                    "localizationDescription": "Cracow, Poland",
                    "deviceName": "Apple iPhone 12 Pro",
                    "__v": 0,
                },
            ],
        },
    })
    public authTokens: FindMeAuthToken[];
}
