import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderReqDto } from './dto/create-order-req.dto';
import { OrdersService } from './orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('AUTH') private readonly authClient: ClientProxy,
    @Inject('BILLING') private readonly billingClient: ClientProxy,
  ) {}

  @Post()
  async createOrder(@Body() createOrderReq: CreateOrderReqDto) {
    return this.ordersService.createOrder(createOrderReq);
  }

  @Post('/testMessagePatterBilling')
  billingMessagePattern() {
    return this.billingClient.send('testMessagePatterBilling', {});
  }
}
