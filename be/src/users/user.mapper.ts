import { User } from '../entities/user.entity';
import { MeDto } from './dto/me.dto';
import { UserSummaryDto } from './dto/user-summary.dto';

// 본인 정보(email 포함)
export function toMeDto(user: User): MeDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    bio: user.bio,
    profileImageUrl: user.profileImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

// 공개 요약 정보(작성자/팔로워·팔로잉 목록용)
export function toUserSummaryDto(user: User): UserSummaryDto {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    profileImageUrl: user.profileImageUrl,
  };
}
