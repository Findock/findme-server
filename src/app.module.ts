import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import securityConfig from "@src/config/security.config";
import mongodbConfig from "./config/mongodb.config";
import { FindMeUsersModule } from "@src/modules/find-me-users/find-me-users.module";
import { FindMeSeederModule } from "@src/modules/find-me-seeder/find-me-seeder.module";
import { FindMeAuthModule } from "./modules/find-me-auth/find-me-auth.module";
import seederConfig from "@src/config/seeder.config";
import envConfig from "@src/config/env.config";
import { FindMeStorageModule } from "@src/modules/find-me-storage/find-me-storage.module";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                mongodbConfig,
                securityConfig,
                seederConfig,
                envConfig,
            ],
        }),
        MongooseModule.forRoot(mongodbConfig().mongodb.uri),
        MulterModule.register({ dest: "./storage" }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../..", "storage"),
            serveRoot: "/storage",
        }),
        FindMeUsersModule,
        FindMeSeederModule,
        FindMeAuthModule,
        FindMeStorageModule,
    ],
})
export class AppModule {
}
