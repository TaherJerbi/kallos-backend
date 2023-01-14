import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderStatus } from './entities/order-status.enum';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user.username);
  }

  @Get()
  findAll(@Req() req) {
    const user = req.user;
    return this.ordersService.findByUser(user.username);
  }

  @Put('/:id')
  async cancelOrder(id: number, @Req() req) {
    const order = await this.ordersService.findOne(id);
    if (req.user.username !== order.user.email) {
      throw new UnauthorizedException();
    }

    return this.ordersService.updateStatus(id, OrderStatus.Cancelled);
  }
}
