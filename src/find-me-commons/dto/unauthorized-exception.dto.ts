import { ApiProperty } from "@nestjs/swagger";

export default class UnauthorizedExceptionDto {
    @ApiProperty({ example: 401 })
    public statusCode: number;

    @ApiProperty({ example: "Unauthorized" })
    public message: string;
}
