import { ApiProperty } from "@nestjs/swagger";

export default class OkMessageDto {
    @ApiProperty({ example: "Everything is fine." })
    public message: string;
}
