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
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RequestWithUser } from './auth/jwt.strategy';
import { UpdateUserDTO } from './users/dto/update-user-dto';
import { UsersService } from './users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  async updatePassword(
    @Req() req: RequestWithUser,
    @Body() body: { currentPassword: string; password: string },
  ) {
    const validUser = await this.authService.validateUser(
      req.user.email,
      body.currentPassword,
    );
    if (validUser) {
      const encrypted = await this.usersService.encryptPassword(body.password);
      await this.usersService.update(req.user.email, {
        password: encrypted,
      });
    }
    return this.getProfile(req);
  }
}
