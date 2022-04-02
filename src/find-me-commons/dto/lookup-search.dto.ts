import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LookupSearchDto {
    @ApiProperty({ example: "query..." })
    @IsString()
    public query: string;
}
