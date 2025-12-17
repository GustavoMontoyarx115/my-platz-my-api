import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "src/env.models";
import { Playload } from "../models/playload.model";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( configService: ConfigService<Env>) {
    const secret = configService.get('JWT_SECRET', { infer: true });
    if (!secret) {
      throw new Error('JWT_SECRET is not set');

  }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }
  validate(payLoad: Playload){
    return payLoad;

  }
}



