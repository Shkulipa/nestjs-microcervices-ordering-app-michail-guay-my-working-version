import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @MessagePattern('testMessagePatterBilling')
  getAnalytics(data: any) {
    console.log('BILLING MICROSERVICE', 'data', data);
    return 'Billing works!';
  }

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any) {
    this.billingService.bill(data);
  }
}
