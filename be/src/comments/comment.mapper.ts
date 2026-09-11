import { Comment } from '../entities/comment.entity';
import { CommentResponseDto } from './dto/comment-response.dto';
import { toUserSummaryDto } from '../users/user.mapper';

// Comment 엔티티(author 관계 로드 필요) → 댓글 응답 DTO
export function toCommentResponseDto(comment: Comment): CommentResponseDto {
  return {
    id: comment.id,
    postId: comment.postId,
    author: toUserSummaryDto(comment.author),
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}
