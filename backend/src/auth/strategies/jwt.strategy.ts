import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    @Inject(jwtConfig.KEY)
    private jwtConf: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConf.secret,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    if (!payload.username) {
      done(null, null);
    }
    const user = await this.userService.findOneByUsername(payload.username);
    return done(null, user);
  }
}
