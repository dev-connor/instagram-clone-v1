import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';
import { PostsController } from './posts.controller';

// 서비스/프로바이더는 be-impl 단계에서 추가
@Module({
  imports: [TypeOrmModule.forFeature([Post, Like, Comment])],
  controllers: [PostsController],
})
export class PostsModule {}
