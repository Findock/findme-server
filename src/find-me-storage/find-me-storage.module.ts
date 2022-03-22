import { Module } from "@nestjs/common";
import { FindMeStorageController } from "@src/find-me-storage/controllers/find-me-storage.controller";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";

@Module({
    imports: [ FindMeUsersModule ],
    controllers: [ FindMeStorageController ],
})
export class FindMeStorageModule {}
