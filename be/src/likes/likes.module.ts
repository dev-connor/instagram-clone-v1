import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../entities/like.entity';
import { Post } from '../entities/post.entity';
import { LikesController } from './likes.controller';

// 서비스/프로바이더는 be-impl 단계에서 추가
@Module({
  imports: [TypeOrmModule.forFeature([Like, Post])],
  controllers: [LikesController],
})
export class LikesModule {}
