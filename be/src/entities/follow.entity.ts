import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

// (followerId, followingId) 복합 unique — 중복 팔로우 방지
// followerId != followingId (자기 자신 팔로우 금지)는 be-impl 단계에서 애플리케이션 레벨 검증
@Entity('follows')
@Unique('UQ_follow_follower_following', ['followerId', 'followingId'])
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 팔로우를 "누르는" 사용자
  @Index()
  @Column({ type: 'uuid' })
  followerId: string;

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followerId' })
  follower: User;

  // 팔로우 "당하는" 사용자
  @Index()
  @Column({ type: 'uuid' })
  followingId: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followingId' })
  following: User;

  @CreateDateColumn()
  createdAt: Date;
}
