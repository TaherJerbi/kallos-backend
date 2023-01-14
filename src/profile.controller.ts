// profile controller
import { Controller, Get, Body, Put, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req) {
    const { password, ...user } = await this.usersService.findOne(
      req.user.email,
    );
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(@Req() req, @Body() body) {
    await this.usersService.update(req.user.email, body);
    return this.getProfile(req);
  }
}
