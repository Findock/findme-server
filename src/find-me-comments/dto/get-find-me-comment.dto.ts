import { ApiProperty } from "@nestjs/swagger";

import { FindMeComment } from "@/find-me-comments/entities/find-me-comment.entity";

export class GetFindMeCommentDto extends FindMeComment {
    @ApiProperty({ example: true })
    public isUserCreator: boolean;

    @ApiProperty({ example: true })
    public canEdit: boolean;
}
