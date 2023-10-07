import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'billing_queue',
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
