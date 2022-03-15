import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength, MinLength } from "class-validator";

export class CreateFindMeUserDto {
    @ApiProperty({
        required: true,
        example: "bunia@gmail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty({
        required: true,
        minLength: 6,
        maxLength: 64,
        example: "bunia1",
    })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(64)
    public password: string;

    @ApiProperty({
        default: "",
        required: false,
        example: "Joahn Kovalsky",
    })
    @IsOptional()
    @IsNotEmpty()
    public name?: string;

    @ApiProperty({
        default: "",
        required: false,
        example: "+48 353 566 433",
    })
    @IsOptional()
    @IsPhoneNumber()
    public phoneNumber?: string;

    @ApiProperty({
        required: false,
        example: true,
    })
    @IsBoolean()
    public termsAccepted?: boolean;
}
