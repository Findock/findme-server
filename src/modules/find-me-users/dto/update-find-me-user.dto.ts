import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateFindMeUserDto {

    @ApiProperty({
        default: "",
        required: false,
        example: "Joahn Kovalsky",
    })
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiProperty({
        default: "",
        required: false,
        example: "+48 353 566 433",
    })
    @IsPhoneNumber()
    @IsString()
    @IsOptional()
    public phoneNumber?: string;

    @ApiProperty({
        default: "",
        required: false,
        example: "ul. Stańczyka",
    })
    @IsString()
    @IsOptional()
    public street?: string;

    @ApiProperty({
        default: "",
        required: false,
        example: "Kraków",
    })
    @IsString()
    @IsOptional()
    public city?: string;

    @ApiProperty({
        default: "",
        required: false,
        example: "Jestem sobie użytkownikiem aplikacji FindMe!",
    })
    @IsString()
    @IsOptional()
    public bio?: string;
}
