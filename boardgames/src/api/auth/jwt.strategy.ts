import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract token from the Authorization header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),  // Get JWT_SECRET from ConfigService
    });
  }

  async validate(payload: any) {
    return { id: payload.sub};  // Return validated user information
  }
}