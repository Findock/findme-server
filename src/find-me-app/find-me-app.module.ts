import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FindMeAuthModule } from "@src/find-me-auth/find-me-auth.module";
import envConfig from "@src/find-me-commons/configurations/env.config";
import mongodbConfig from "@src/find-me-commons/configurations/mongodb.config";
import securityConfig from "@src/find-me-commons/configurations/security.config";
import seederConfig from "@src/find-me-commons/configurations/seeder.config";
import { FindMeCommonsModule } from "@src/find-me-commons/find-me-commons.module";
import { FindMeSecurityModule } from "@src/find-me-security/find-me-security.module";
import { FindMeSeederModule } from "@src/find-me-seeder/find-me-seeder.module";
import { FindMeStorageModule } from "@src/find-me-storage/find-me-storage.module";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";
import { join } from "path";

@Module({
    imports: [
        // Global modules start
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
        FindMeCommonsModule,
        FindMeSecurityModule,
        // Global modules end

        // Application modules start
        FindMeStorageModule,
        FindMeUsersModule,
        FindMeAuthModule,
        FindMeSeederModule,
        // Application modules end
    ],
})
export class FindMeAppModule {}
