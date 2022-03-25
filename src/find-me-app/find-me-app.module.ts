import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { FindMeAuthModule } from "@/find-me-auth/find-me-auth.module";
import { envConfig } from "@/find-me-commons/configurations/env.config";
import { mongoDbConfig } from "@/find-me-commons/configurations/mongodb.config";
import { securityConfig } from "@/find-me-commons/configurations/security.config";
import { seederConfig } from "@/find-me-commons/configurations/seeder.config";
import { FindMeCommonsModule } from "@/find-me-commons/find-me-commons.module";
import { FindMeMailerModule } from "@/find-me-mailer/find-me-mailer.module";
import { FindMeSecurityModule } from "@/find-me-security/find-me-security.module";
import { FindMeSeederModule } from "@/find-me-seeder/find-me-seeder.module";
import { FindMeStorageModule } from "@/find-me-storage/find-me-storage.module";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

@Module({
    imports: [
        // Global modules start
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                mongoDbConfig,
                securityConfig,
                seederConfig,
                envConfig,
            ],
        }),
        MongooseModule.forRoot(mongoDbConfig().mongodb.uri),
        MulterModule.register({ dest: "./storage" }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../../..", "storage"),
            serveRoot: "/storage",
        }),
        FindMeCommonsModule,
        FindMeSecurityModule,
        FindMeMailerModule,
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
