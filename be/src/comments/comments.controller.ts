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
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { PaginatedCommentsDto } from './dto/paginated-comments.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('comments')
@ApiBearerAuth()
@Controller()
export class CommentsController {
  @Post('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiCreatedResponse({ type: CommentResponseDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  create(
    @Param('postId') _postId: string,
    @Body() _dto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 목록 (페이지네이션)' })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiOkResponse({ type: PaginatedCommentsDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  list(
    @Param('postId') _postId: string,
    @Query() _query: PaginationQueryDto,
  ): Promise<PaginatedCommentsDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Delete('comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '본인 댓글 삭제' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: '삭제 완료' })
  @ApiForbiddenResponse({ description: '본인 댓글이 아님' })
  @ApiNotFoundResponse({ description: '댓글을 찾을 수 없음' })
  remove(@Param('id') _id: string): Promise<void> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }
}
