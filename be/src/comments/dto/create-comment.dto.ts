import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// POST /posts/:postId/comments
export class CreateCommentDto {
  @ApiProperty({ example: '멋진 사진이네요!', maxLength: 2200 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2200)
  content: string;
}
