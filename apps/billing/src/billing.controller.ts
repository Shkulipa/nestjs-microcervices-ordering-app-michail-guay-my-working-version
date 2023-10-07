import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @MessagePattern('testMessagePatterBilling')
  getAnalytics(data: any) {
    console.log('BILLING MICROSERVICE', 'data', data);
    return 'Billing works!';
  }

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data: any) {
    this.billingService.bill(data);
  }
}
