import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LookupSearchDto {
    @ApiProperty({ example: "a" })
    @IsString()
    public query: string;
}
