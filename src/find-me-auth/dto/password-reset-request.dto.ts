import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class PasswordResetRequestDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: "bunia@gmail.com",
        required: true,
    })
    public email: string;
}
