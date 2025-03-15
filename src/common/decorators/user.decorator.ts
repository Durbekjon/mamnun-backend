import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/modules/auth/dto/user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
