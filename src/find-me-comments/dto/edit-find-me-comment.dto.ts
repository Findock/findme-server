import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFindMeCommentDto {
    @ApiProperty({ example: "Widziałam tego kotka!" })
    @IsString()
    @IsOptional()
    public comment?: string;

    @ApiProperty({ example: 50.0269432 })
    @IsNumber()
    @IsOptional()
    public locationLat?: number;

    @ApiProperty({ example: 19.98215342386123 })
    @IsNumber()
    @IsOptional()
    public locationLon?: number;

    @ApiProperty({ example: [] })
    @IsArray()
    public photosIds: number[];
}
