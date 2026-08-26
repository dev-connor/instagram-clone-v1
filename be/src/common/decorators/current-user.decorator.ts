import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../../auth/interfaces/authenticated-user.interface';

// @CurrentUser() userId: string  → 로그인 사용자의 id 주입
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{
      user: AuthenticatedUser;
    }>();
    return request.user.userId;
  },
);
