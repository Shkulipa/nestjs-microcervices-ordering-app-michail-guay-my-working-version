import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderReqDto } from './dto/create-order-req.dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@app/common';

@Controller('/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('AUTH') private readonly authClient: ClientProxy,
    @Inject('BILLING') private readonly billingClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderReq: CreateOrderReqDto,
    @Req() req: any,
  ) {
    return this.ordersService.createOrder(
      createOrderReq,
      req.cookies?.Authentication,
    );
  }

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Post('/testMessagePatterAuth')
  authMessagePattern() {
    return this.authClient.send('testMessagePatterAuth', {});
  }

  @Post('/testMessagePatterBilling')
  billingMessagePattern() {
    return this.billingClient.send('testMessagePatterBilling', {});
  }
}
