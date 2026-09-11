import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { PaginatedCommentsDto } from './dto/paginated-comments.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { toCommentResponseDto } from './comment.mapper';
import { buildPageMeta, toSkipTake } from '../common/pagination';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  // FR-C1: 게시물에 댓글 작성
  async create(
    postId: string,
    authorId: string,
    dto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    await this.assertPostExists(postId);

    const comment = this.commentRepo.create({
      postId,
      authorId,
      content: dto.content,
      parentCommentId: null,
    });
    const saved = await this.commentRepo.save(comment);

    // author 관계를 채워 응답 구성
    const withAuthor = await this.commentRepo.findOne({
      where: { id: saved.id },
      relations: { author: true },
    });
    // 방금 저장했으므로 항상 존재
    return toCommentResponseDto(withAuthor!);
  }

  // FR-C2: 게시물의 댓글 목록 (최신순, 페이지네이션)
  async list(
    postId: string,
    query: PaginationQueryDto,
  ): Promise<PaginatedCommentsDto> {
    await this.assertPostExists(postId);

    const { skip, take } = toSkipTake(query.page, query.limit);
    const [comments, totalItems] = await this.commentRepo.findAndCount({
      where: { postId, parentCommentId: IsNull() },
      relations: { author: true },
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return {
      items: comments.map(toCommentResponseDto),
      meta: buildPageMeta(totalItems, query.page, query.limit),
    };
  }

  // FR-C3: 본인 댓글 삭제
  async remove(id: string, userId: string): Promise<void> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
    if (comment.authorId !== userId) {
      throw new ForbiddenException('본인 댓글만 삭제할 수 있습니다.');
    }
    await this.commentRepo.remove(comment);
  }

  private async assertPostExists(postId: string): Promise<void> {
    const exists = await this.postRepo.exists({ where: { id: postId } });
    if (!exists) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
  }
}
