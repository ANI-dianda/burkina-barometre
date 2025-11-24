import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    /* getRequest returns `any` from the framework; explicitly silence the
     unsafe-assignment/member-access rules for this narrow wrapper. */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    return user;
  },
);
