import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version } from '../package.json';
import figlet = require('figlet');
import gradient = require('gradient-string');
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appListenPort = process.env.LISTEN_PORT || 3002;
  const serverEnv = process.env.ENV || 'local';

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FindMe API')
    .setDescription('FindMe API description')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appListenPort);

  figlet('FindMe Server v' + version, (err, data) => {
    console.log(gradient.instagram.multiline(data));
    console.log(gradient.vice(' © 2022 Findock \n'));
    console.log(
      gradient.vice(
        ' Server current envirement running in ' +
          serverEnv.toUpperCase() +
          ' \n',
      ),
      gradient.vice('Server is listening on ::' + appListenPort + '\n\n\n'),
    );
  });
}
bootstrap();
