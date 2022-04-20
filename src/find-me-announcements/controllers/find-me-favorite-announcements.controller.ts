import { ClassSerializerInterceptor, Controller, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { FindMeFavoriteAnnouncementsService }
    from "@/find-me-announcements/services/find-me-favorite-announcements.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";

@ApiTags(ApiTagsConstants.ANNOUNCEMENTS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class FindMeFavoriteAnnouncementsController {
    public constructor(
        private favoriteAnnouncementsService: FindMeFavoriteAnnouncementsService
    ) { }
}
