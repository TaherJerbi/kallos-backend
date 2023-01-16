import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AbstractController, { ApiResponse } from './abstract.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDTO } from './users/dto/create-user-dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController extends AbstractController{
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super()
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.successResponse(this.authService.login(req.user));
  }

  @Post('auth/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.create(createUserDTO);
    return this.successResponse({
      ...user,
      password: undefined,
    });
  }
}
