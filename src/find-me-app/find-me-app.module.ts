import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";
import { FindMeSeederModule } from "@src/find-me-seeder/find-me-seeder.module";
import envConfig from "@src/find-me-commons/config/env.config";
import { FindMeStorageModule } from "@src/find-me-storage/find-me-storage.module";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FindMeSecurityModule } from "@src/find-me-security/find-me-security.module";
import mongodbConfig from "@src/find-me-commons/config/mongodb.config";
import securityConfig from "@src/find-me-commons/config/security.config";
import seederConfig from "@src/find-me-commons/config/seeder.config";
import { FindMeAuthModule } from "@src/find-me-auth/find-me-auth.module";

@Module({
    imports: [
        // Global modules
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
        FindMeSecurityModule,

        // Application modules
        FindMeUsersModule,
        FindMeSeederModule,
        FindMeAuthModule,
        FindMeStorageModule,
    ],
})
export class FindMeAppModule {}
