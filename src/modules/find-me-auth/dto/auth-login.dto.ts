import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
    @ApiProperty({
        required: true,
        example: "u0@email.com",
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty({
        required: true,
        example: "password",
    })
    @IsNotEmpty()
    public password: string;

    @ApiProperty({
        required: true,
        example: "Apple iPhone 11 Pro Max",
    })
    @IsNotEmpty()
    public deviceName: string;
}
