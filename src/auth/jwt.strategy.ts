import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

type JwtPayload = {
  username: string;
  sub: string;
};

type JwtResponse = {
  userId: string;
  email: string;
};

export type RequestWithUser = {
  user: JwtResponse;
} & Request;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtResponse> {
    return { userId: payload.sub, email: payload.username };
  }
}
