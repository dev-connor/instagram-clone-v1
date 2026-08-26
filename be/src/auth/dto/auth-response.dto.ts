import { ApiProperty } from '@nestjs/swagger';
import { MeDto } from '../../users/dto/me.dto';

// POST /auth/signup, POST /auth/login 응답 — 액세스 토큰 + 내 정보
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT 액세스 토큰 (Authorization: Bearer <token>)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({ type: () => MeDto })
  user: MeDto;
}
