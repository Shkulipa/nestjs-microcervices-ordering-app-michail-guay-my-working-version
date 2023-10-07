import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH',
        useFactory: (configService: ConfigService) => {
          console.log(
            'AUTH MODULE',
            configService.get<string>('RABBIT_MQ_AUTH_QUEUE'),
          );
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RABBIT_MQ_URI')],
              queue: configService.get<string>('RABBIT_MQ_AUTH_QUEUE'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
