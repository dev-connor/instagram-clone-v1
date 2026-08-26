import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

// POST /posts
export class CreatePostDto {
  @ApiProperty({
    description: '게시물 이미지 URL',
    example: 'https://cdn.example.com/posts/abc.jpg',
    maxLength: 500,
  })
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(500)
  imageUrl: string;

  @ApiPropertyOptional({ example: '오늘의 훈련 🏋️', maxLength: 2200 })
  @IsOptional()
  @IsString()
  @MaxLength(2200)
  caption?: string;

  @ApiPropertyOptional({ example: '평창국민체육관', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;
}
