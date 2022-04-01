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
        example: "Apple iPhone 11 Pro Max",
    })
    @IsNotEmpty()
    public deviceName: string;

    @ApiProperty({
        required: true,
        example: "Cracow, Poland",
    })
    @IsNotEmpty()
    public localizationDescription: string;
}
