import { ApiProperty } from "@nestjs/swagger";

export default class ErrorExceptionDto {
    @ApiProperty({ example: 401 })
    public statusCode: number;

    @ApiProperty({ example: [ "User with this email does not exist." ] })
    public message: string[];

    @ApiProperty({ example: "Unauthorized" })
    public error: string;
}
