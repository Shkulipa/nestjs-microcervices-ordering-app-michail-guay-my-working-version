import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderReqDto } from './dto/create-order-req.dto';
import { OrdersRepository } from './orders.repository';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject('BILLING') private billingClient: ClientProxy,
  ) {}

  async createOrder(createOrderReq: CreateOrderReqDto) {
    const order = await this.ordersRepository.create(createOrderReq);

    const record = new RmqRecordBuilder(createOrderReq)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
        timestamp: Date.now(),
      })
      .build();
    this.billingClient.emit('order_created', record);
    return order;
  }
}
