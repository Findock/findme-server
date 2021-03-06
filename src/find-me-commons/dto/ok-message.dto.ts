import { ApiProperty } from "@nestjs/swagger";

export class OkMessageDto {
    @ApiProperty({ example: "Everything is fine." })
    public message: string;
}
