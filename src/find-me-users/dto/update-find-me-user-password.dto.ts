import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdateFindMeUserPasswordDto {
    @ApiProperty({
        example: "bunia1",
        required: true,
    })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(64)
    public oldPassword: string;

    @ApiProperty({
        example: "bunia1",
        required: true,
    })
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(64)
    public newPassword: string;
}
