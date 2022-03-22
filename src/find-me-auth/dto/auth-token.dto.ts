import { ApiProperty } from "@nestjs/swagger";

export class AuthTokenDto {
    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiJ9.NjIxMmJh" })
    public access_token: string;

    @ApiProperty({ example: "Bearer" })
    public token_type: string;
}
