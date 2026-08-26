import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { Follow } from '../entities/follow.entity';
import { UsersController } from './users.controller';

// 서비스/프로바이더는 be-impl 단계에서 추가
@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Follow])],
  controllers: [UsersController],
})
export class UsersModule {}
