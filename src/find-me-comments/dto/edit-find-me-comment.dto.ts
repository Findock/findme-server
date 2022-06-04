import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class EditFindMeCommentDto {
    @ApiProperty({ example: "Widziałam tego kotka!" })
    @IsString()
    @IsOptional()
    public comment?: string;

    @ApiProperty({ example: 50.0269432 })
    @IsOptional()
    public locationLat?: number;

    @ApiProperty({ example: 19.98215342386123 })
    @IsOptional()
    public locationLon?: number;

    @ApiProperty({ example: [] })
    @IsArray()
    public photosIds: number[];
}
