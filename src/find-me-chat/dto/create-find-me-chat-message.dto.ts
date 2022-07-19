import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";

export class CreateFindMeChatMessageDto {
    @ApiProperty({ example: "Znalazłam Twojego psa!" })
    @IsString()
    @IsOptional()
    public message?: string;

    @ApiProperty({ example: [ 1, 2 ] })
    @IsArray()
    @IsOptional()
    public photosIds?: number[];

    @ApiProperty({ example: 50.0469432 })
    @IsNumber()
    @IsOptional()
    public locationLat?: number;

    @ApiProperty({ example: 19.997153435836697 })
    @IsNumber()
    @IsOptional()
    public locationLon?: number;
}
