import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(
      '🚀 ~ file: local.strategy.ts:13 ~ LocalStrategy ~ validate ~ password',
      password,
    );
    console.log(
      '🚀 ~ file: local.strategy.ts:13 ~ LocalStrategy ~ validate ~ email',
      email,
    );
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
