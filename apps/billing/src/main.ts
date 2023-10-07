import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { ConfigService } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  const configService = app.get(ConfigService);
  const options = new RmqService(configService).getOptions('BILLING', true);
  app.connectMicroservice<RmqOptions>(options);

  await app.startAllMicroservices();
}
bootstrap();
