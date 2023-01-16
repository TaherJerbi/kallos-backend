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
import { RequestWithUser } from 'src/auth/jwt.strategy';
import AbstractController from 'src/abstract.controller';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController extends AbstractController {
  constructor(private readonly ordersService: OrdersService) {
    super()
  }

  @Post()
  create(@Req() req: RequestWithUser, @Body() createOrderDto: CreateOrderDto) {
    return this.successResponse(this.ordersService.create(createOrderDto, req.user.email));
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.successResponse(this.ordersService.findByUser(user.email));
  }

  @Post(':id/cancel')
  async cancelOrder(id: number, @Req() req: RequestWithUser) {
    const order = await this.ordersService.findOne(id);
    if (order.user.id !== +req.user.userId) {
      throw new UnauthorizedException();
    }

    return this.successResponse(this.ordersService.updateStatus(order.id, OrderStatus.Cancelled));
  }
}
