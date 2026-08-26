import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// POST /auth/signup
export class SignupDto {
  @ApiProperty({
    example: 'gildong',
    minLength: 3,
    maxLength: 30,
    description: '영문/숫자/밑줄/마침표만 허용',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'username 은 영문/숫자/밑줄(_)/마침표(.) 만 사용할 수 있습니다.',
  })
  username: string;

  @ApiProperty({ example: 'gildong@example.com', maxLength: 255 })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!', minLength: 8, maxLength: 72 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @ApiPropertyOptional({ example: '홍길동', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;
}
