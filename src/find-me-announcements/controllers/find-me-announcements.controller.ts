import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";

@ApiTags(ApiTagsConstants.ANNOUNCEMENTS)
@Controller(PathConstants.ANNOUNCEMENTS)
export class FindMeAnnouncementsController {

    @ApiOperation({
        summary: "Create new announcement",
        description: "Creates new announcement and returns it",
    })
    @Post()
    public async createAnnouncement(): Promise<string> {
        return "OK";
    }
}
