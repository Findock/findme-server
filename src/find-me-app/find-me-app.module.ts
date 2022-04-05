import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

import { FindMeAnnouncementsModule } from "@/find-me-announcements/find-me-announcements.module";
import { envConfig } from "@/find-me-commons/configurations/env.config";
import { securityConfig } from "@/find-me-commons/configurations/security.config";
import { seederConfig } from "@/find-me-commons/configurations/seeder.config";
import { FindMeCommonsModule } from "@/find-me-commons/find-me-commons.module";
import { FindMeDbModule } from "@/find-me-db/find-me-db.module";
import { FindMeLocationModule } from "@/find-me-location/find-me-location.module";
import { FindMeMailerModule } from "@/find-me-mailer/find-me-mailer.module";
import { FindMeSecurityModule } from "@/find-me-security/find-me-security.module";
import { FindMeStaticModule } from "@/find-me-static/find-me-static.module";
import { FindMeStorageModule } from "@/find-me-storage/find-me-storage.module";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

@Module({
    imports: [
        // Global modules start
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                securityConfig,
                seederConfig,
                envConfig,
            ],
        }),
        TypeOrmModule.forRoot({ autoLoadEntities: true }),
        MulterModule.register({ dest: "./storage" }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "../../..", "storage"),
            serveRoot: "/storage",
        }),
        FindMeDbModule,
        FindMeCommonsModule,
        FindMeSecurityModule,
        FindMeMailerModule,
        // Global modules end

        // Application modules start
        FindMeStaticModule,
        FindMeStorageModule,
        FindMeUsersModule,
        FindMeAnnouncementsModule,
        FindMeLocationModule,
        // Application modules end
    ],
})
export class FindMeAppModule { }
