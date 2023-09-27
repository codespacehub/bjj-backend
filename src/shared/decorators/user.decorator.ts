import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// FUNC: Para criar o decorator de usuário e pegar os dados por meio do token
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
