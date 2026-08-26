import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Bearer 토큰 미존재/만료/위조 시 401 반환
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
