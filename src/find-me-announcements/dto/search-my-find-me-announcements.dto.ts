import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class SearchMyFindMeMyAnnouncementsDto {
    @ApiProperty()
    @IsBoolean()
    public active: boolean;
}
