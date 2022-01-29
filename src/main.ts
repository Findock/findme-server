import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version } from '../package.json';
import figlet = require('figlet');
import gradient = require('gradient-string');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  figlet('FindMe Server v' + version, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    console.log(gradient.pastel(' © 2022 Findock'));
  });
}
bootstrap();
