import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LikeStatusDto } from './dto/like-status.dto';
import { LikeCountDto } from './dto/like-count.dto';

@ApiTags('likes')
@ApiBearerAuth()
@Controller('posts/:postId/likes')
export class LikesController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '좋아요 등록',
    description: '이미 좋아요한 상태면 멱등하게 현재 상태를 반환',
  })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiCreatedResponse({ type: LikeStatusDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  like(@Param('postId') _postId: string): Promise<LikeStatusDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Delete()
  @ApiOperation({ summary: '좋아요 취소' })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiOkResponse({ type: LikeStatusDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  unlike(@Param('postId') _postId: string): Promise<LikeStatusDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get('count')
  @ApiOperation({
    summary: '좋아요 수 조회',
    description: 'Post 상세에 포함되므로 선택적',
  })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiOkResponse({ type: LikeCountDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  count(@Param('postId') _postId: string): Promise<LikeCountDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }
}
