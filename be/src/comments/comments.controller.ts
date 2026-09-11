import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { PaginatedCommentsDto } from './dto/paginated-comments.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('comments')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: '인증 토큰이 없거나 유효하지 않음' })
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 작성' })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiCreatedResponse({ type: CommentResponseDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() userId: string,
  ): Promise<CommentResponseDto> {
    return this.commentsService.create(postId, userId, dto);
  }

  @Get('posts/:postId/comments')
  @ApiOperation({ summary: '댓글 목록 (페이지네이션)' })
  @ApiParam({ name: 'postId', format: 'uuid' })
  @ApiOkResponse({ type: PaginatedCommentsDto })
  @ApiNotFoundResponse({ description: '게시물을 찾을 수 없음' })
  list(
    @Param('postId') postId: string,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedCommentsDto> {
    return this.commentsService.list(postId, query);
  }

  @Delete('comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '본인 댓글 삭제' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: '삭제 완료' })
  @ApiForbiddenResponse({ description: '본인 댓글이 아님' })
  @ApiNotFoundResponse({ description: '댓글을 찾을 수 없음' })
  remove(
    @Param('id') id: string,
    @CurrentUser() userId: string,
  ): Promise<void> {
    return this.commentsService.remove(id, userId);
  }
}
