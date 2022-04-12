import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
    @ApiProperty({
        required: true,
        example: "bunia@gmail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty({
        required: true,
        example: "bunia1",
    })
    @IsNotEmpty()
    public password: string;

    @ApiProperty({
        required: true,
        example: "Apple iPhone 11",
    })
    @IsNotEmpty()
    public deviceName: string;

    @ApiProperty({
        required: true,
        example: "50.0469432 19.997153435836697",
    })
    @IsNotEmpty()
    public localizationDescription: string;
}
