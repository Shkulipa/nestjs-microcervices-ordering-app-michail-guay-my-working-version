import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BillingController {
  constructor() {}

  @MessagePattern('billingMessagePattern')
  getAnalytics(data: any) {
    console.log('BILLING MICROSERVICE', 'data', data);
    return '';
  }
}
