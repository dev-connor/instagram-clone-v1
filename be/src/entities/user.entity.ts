import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Follow } from './follow.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // unique: true 로 unique index 자동 생성
  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  // 평문 저장 금지 — bcrypt 등으로 해시한 값만 저장 (be-impl 단계에서 해싱)
  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  profileImageUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  // 내가 누른 팔로우 (follower = 나)
  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  // 나를 팔로우한 관계 (following = 나)
  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];
}
