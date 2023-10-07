import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);
  const options = new RmqService(configService).getOptions('AUTH', true);
  app.connectMicroservice<RmqOptions>(options);
  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
