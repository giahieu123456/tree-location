import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ToArray = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any[] => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.query[data as any];

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  },
);
