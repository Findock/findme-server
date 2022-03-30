import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class PasswordResetByTokenDto {
    @ApiProperty({
        example: "hbGciOiJIUzI1NiIsInR5cCI6IkpeyJfaWQiOiI2MjE5ZGViYjk0MzRjNGI3YWRmYWU4MTYiLCJ0IjoxNjQ3OTcwNzI1MTU",
        required: true,
    })
    @IsNotEmpty()
    public token: string;

    @ApiProperty({
        required: true,
        minLength: 6,
        maxLength: 64,
        example: "bunia1",
    })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(64)
    public newPassword: string;
}
