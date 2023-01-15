// profile controller
import {
  Controller,
  Get,
  Body,
  Put,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RequestWithUser } from './auth/jwt.strategy';
import { UpdateUserDTO } from './users/dto/update-user-dto';
import { UsersService } from './users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: RequestWithUser) {
    const { password, ...user } = await this.usersService.findOne(
      req.user.email,
    );
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() body: UpdateUserDTO,
  ) {
    await this.usersService.update(req.user.email, body);
    return this.getProfile(req);
  }
}
