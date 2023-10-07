import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env',
    }),
  ],
  controllers: [BillingController],
})
export class BillingModule {}
