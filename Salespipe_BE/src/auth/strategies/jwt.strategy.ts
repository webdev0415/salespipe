import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/shared/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) configService: ConfigService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret'),
    });
  }

  async validate(payload: any) {
    const maybeUser = await this.usersService.findByEmail(payload.email);
    let roles: any = [Roles.NOROLE];
    if (maybeUser) {
      if (maybeUser.roles.length > 0)
        roles = maybeUser.roles.map((r) => r.code);
    }
    return { id: maybeUser.id, email: payload.email, roles };
  }
}
