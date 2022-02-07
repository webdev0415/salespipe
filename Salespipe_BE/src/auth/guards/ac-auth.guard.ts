import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACGuard, RolesBuilder } from 'nest-access-control';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ACAuthGuard extends ACGuard {
  private readonly reflector2: Reflector;
  constructor(reflector: Reflector, roleBuilder: RolesBuilder) {
    super(reflector, roleBuilder);
    this.reflector2 = reflector;
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector2.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
