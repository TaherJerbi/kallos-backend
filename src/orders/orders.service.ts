import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatus } from './entities/order-status.enum';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto, email: string) {
    const user = await this.usersService.findOne(email);
    console.log(
      '🚀 ~ file: orders.service.ts:27 ~ OrdersService ~ create ~ user',
      user,
    );
    const order = this.ordersRepository.create({
      orderDate: new Date(),
      status: createOrderDto.status,
      user,
    });
    console.log(
      '🚀 ~ file: orders.service.ts:36 ~ OrdersService ~ create ~ order',
      order,
    );
    await this.ordersRepository.save(order);

    for (const orderItem of createOrderDto.orderItems) {
      const product = await this.productsRepository.findOne({
        where: { id: orderItem.productId },
      });
      const newOrderItem = this.orderItemsRepository.create({
        quantity: orderItem.quantity,
        product,
        order,
      });
      await this.orderItemsRepository.save(newOrderItem);
    }
    return this.findOne(order.id);
  }

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  findByUser(email: string) {
    return this.ordersRepository.find({
      where: { user: { email } },
      relations: ['orderItems', 'orderItems.product'],
    });
  }

  updateStatus(id: number, status: OrderStatus) {
    return this.ordersRepository.update({ id }, { status });
  }
}
