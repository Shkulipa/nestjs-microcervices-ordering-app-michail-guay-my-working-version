import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { ConfigModule } from '@nestjs/config';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env',
    }),
    RmqModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
