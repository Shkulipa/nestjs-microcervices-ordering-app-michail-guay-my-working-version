import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'auth_queue',
    },
  });
  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
