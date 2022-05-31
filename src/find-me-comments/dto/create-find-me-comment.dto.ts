import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateFindMeCommentDto {
    @ApiProperty({ example: 1 })
    @IsPositive()
    @IsNumber()
    public commentedAnnouncementId: number;

    @ApiProperty({ example: "Widziałam tego pieska!" })
    @IsNotEmpty()
    @IsString()
    public comment: string;

    @ApiProperty({ example: 50.0469432 })
    @IsNumber()
    @IsOptional()
    public locationLat?: number;

    @ApiProperty({ example: 19.997153435836697 })
    @IsNumber()
    @IsOptional()
    public locationLot?: number;

    @ApiProperty({ example: [] })
    @IsArray()
    public photosIds: number[];
}
