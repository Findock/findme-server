import { Module } from "@nestjs/common";
import { FindMeStorageController } from "@src/modules/find-me-storage/find-me-storage.controller";
import { FindMeUsersModule } from "@src/modules/find-me-users/find-me-users.module";

@Module({
    imports: [ FindMeUsersModule ],
    controllers: [ FindMeStorageController ],
})
export class FindMeStorageModule {}
