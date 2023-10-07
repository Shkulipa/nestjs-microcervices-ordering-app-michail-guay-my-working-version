import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(
    @Inject('AUTH') private readonly authClient: ClientProxy,
    @Inject('BILLING') private readonly billingClient: ClientProxy,
  ) {}

  @Get('/billingMessagePattern')
  billingMessagePattern() {
    return this.billingClient.send('billingMessagePattern', {});
  }
}
