import { ApiProperty } from "@nestjs/swagger";

export class BadRequestExceptionDto {
    @ApiProperty({ example: 400 })
    public statusCode: number;

    @ApiProperty({ example: [ "Bad request" ] })
    public message: string[];
}
