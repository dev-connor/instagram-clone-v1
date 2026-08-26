import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '../entities/follow.entity';
import { User } from '../entities/user.entity';
import { FollowsController } from './follows.controller';

// 서비스/프로바이더는 be-impl 단계에서 추가
@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  controllers: [FollowsController],
})
export class FollowsModule {}
