import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { version } from "../package.json";
import { FindMeAppModule } from "./find-me-app/find-me-app.module";
import figlet = require("figlet");
import gradient = require("gradient-string");

async function bootstrap(): Promise<void> {

    const appListenPort = process.env.LISTEN_PORT || 3002;
    const serverEnv = process.env.ENV || "local";

    const app = await NestFactory.create(FindMeAppModule);

    const config = new DocumentBuilder()
        .setTitle("🐶 FindMe API")
        .setDescription("FindMe API OAS3 documentation.")
        .setVersion(version)
        .addSecurity("bearer", {
            type: "http",
            scheme: "bearer",
        })
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, { customSiteTitle: "FindMe :: Swagger v" + version });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(appListenPort);

    figlet("FindMe Server", (_err, data) => {
        const year = new Date().getFullYear();
        console.log(gradient.instagram.multiline(data), "v" + version);
        console.log(gradient.vice(" © " + year + " Findock \n "));
        console.log(
            gradient.vice(
                " Server current environment running in " +
                serverEnv.toUpperCase() +
                " \n",
            ),
            gradient.vice("Server is listening on ::" + appListenPort + "\n\n\n"),
        );
    });
}
bootstrap();
