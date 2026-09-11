import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';

const POST_ID = 'post-uuid';
const USER_ID = 'user-uuid';

function makeComment(overrides: Partial<Comment> = {}): Comment {
  return {
    id: 'comment-uuid',
    postId: POST_ID,
    authorId: USER_ID,
    content: '멋진 사진이네요!',
    parentCommentId: null,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    author: {
      id: USER_ID,
      username: 'gildong',
      name: '홍길동',
      profileImageUrl: null,
    },
    ...overrides,
  } as Comment;
}

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepo: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
    findAndCount: jest.Mock;
    remove: jest.Mock;
  };
  let postRepo: { exists: jest.Mock };

  beforeEach(async () => {
    commentRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      remove: jest.fn(),
    };
    postRepo = { exists: jest.fn().mockResolvedValue(true) };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Comment), useValue: commentRepo },
        { provide: getRepositoryToken(Post), useValue: postRepo },
      ],
    }).compile();

    service = moduleRef.get(CommentsService);
  });

  describe('create', () => {
    it('게시물이 존재하면 댓글을 저장하고 작성자 요약과 함께 반환한다', async () => {
      const comment = makeComment();
      commentRepo.create.mockReturnValue(comment);
      commentRepo.save.mockResolvedValue(comment);
      commentRepo.findOne.mockResolvedValue(comment);

      const result = await service.create(POST_ID, USER_ID, {
        content: '멋진 사진이네요!',
      });

      expect(commentRepo.create).toHaveBeenCalledWith({
        postId: POST_ID,
        authorId: USER_ID,
        content: '멋진 사진이네요!',
        parentCommentId: null,
      });
      expect(result.author.username).toBe('gildong');
      expect(result.content).toBe('멋진 사진이네요!');
    });

    it('게시물이 없으면 NotFoundException 을 던진다', async () => {
      postRepo.exists.mockResolvedValue(false);

      await expect(
        service.create(POST_ID, USER_ID, { content: 'hi' }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(commentRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('최신순 top-level 댓글과 페이지 메타를 반환한다', async () => {
      commentRepo.findAndCount.mockResolvedValue([[makeComment()], 1]);

      const result = await service.list(POST_ID, { page: 1, limit: 20 });

      expect(commentRepo.findAndCount).toHaveBeenCalledWith({
        where: { postId: POST_ID, parentCommentId: IsNull() },
        relations: { author: true },
        order: { createdAt: 'DESC' },
        skip: 0,
        take: 20,
      });
      expect(result.items).toHaveLength(1);
      expect(result.meta.totalItems).toBe(1);
      expect(result.meta.hasNextPage).toBe(false);
    });
  });

  describe('remove', () => {
    it('본인 댓글이면 삭제한다', async () => {
      const comment = makeComment();
      commentRepo.findOne.mockResolvedValue(comment);

      await service.remove(comment.id, USER_ID);

      expect(commentRepo.remove).toHaveBeenCalledWith(comment);
    });

    it('댓글이 없으면 NotFoundException 을 던진다', async () => {
      commentRepo.findOne.mockResolvedValue(null);

      await expect(service.remove('x', USER_ID)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('타인 댓글이면 ForbiddenException 을 던진다', async () => {
      commentRepo.findOne.mockResolvedValue(
        makeComment({ authorId: 'someone-else' }),
      );

      await expect(service.remove('comment-uuid', USER_ID)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(commentRepo.remove).not.toHaveBeenCalled();
    });
  });
});
