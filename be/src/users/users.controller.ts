import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MeDto } from './dto/me.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedPostsDto } from '../posts/dto/paginated-posts.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  @Get('me')
  @ApiOperation({ summary: '내 프로필 조회' })
  @ApiOkResponse({ type: MeDto })
  getMe(): Promise<MeDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Patch('me')
  @ApiOperation({ summary: '내 프로필 수정 (name/bio/profileImageUrl)' })
  @ApiOkResponse({ type: MeDto })
  updateMe(@Body() _dto: UpdateProfileDto): Promise<MeDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 사용자 프로필 조회',
    description:
      'postCount / followerCount / followingCount / isFollowedByMe 포함',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: UserProfileDto })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  getUser(@Param('id') _id: string): Promise<UserProfileDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get(':id/posts')
  @ApiOperation({ summary: '특정 사용자의 게시물 목록 (프로필 그리드)' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: PaginatedPostsDto })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  getUserPosts(
    @Param('id') _id: string,
    @Query() _query: PaginationQueryDto,
  ): Promise<PaginatedPostsDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }
}
