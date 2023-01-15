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

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user.email);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.ordersService.findByUser(user.email);
  }

  @Put('/:id')
  async cancelOrder(id: number, @Req() req: RequestWithUser) {
    const order = await this.ordersService.findOne(id);
    if (req.user.email !== order.user.email) {
      throw new UnauthorizedException();
    }

    return this.ordersService.updateStatus(id, OrderStatus.Cancelled);
  }
}
