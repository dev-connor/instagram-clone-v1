import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { PaginatedPostsDto } from './dto/paginated-posts.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  @Post()
  @ApiOperation({ summary: '게시물 작성' })
  @ApiCreatedResponse({ type: PostResponseDto })
  create(@Body() _dto: CreatePostDto): Promise<PostResponseDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get('feed')
  @ApiOperation({
    summary: '홈 피드',
    description: '팔로우 중인 사용자 + 본인 게시물, 최신순 페이지네이션',
  })
  @ApiOkResponse({ type: PaginatedPostsDto })
  getFeed(@Query() _query: PaginationQueryDto): Promise<PaginatedPostsDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시물 상세',
    description: 'likeCount / commentCount / isLikedByMe 포함',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: PostResponseDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  getOne(@Param('id') _id: string): Promise<PostResponseDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '본인 게시물 삭제' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: '삭제 완료' })
  @ApiForbiddenResponse({ description: '본인 게시물이 아님' })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  remove(@Param('id') _id: string): Promise<void> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }
}
