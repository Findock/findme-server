import { ApiProperty } from "@nestjs/swagger";

export default class BadRequestExceptionDto {
    @ApiProperty({ example: 400 })
    public statusCode: number;

    @ApiProperty({ example: [ "Bad request" ] })
    public message: string[];
}
