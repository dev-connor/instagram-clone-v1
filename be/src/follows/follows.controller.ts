import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FollowStatusDto } from './dto/follow-status.dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('follows')
@ApiBearerAuth()
@Controller('users/:id')
export class FollowsController {
  @Post('follow')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '팔로우' })
  @ApiParam({ name: 'id', description: '팔로우할 대상 사용자 id', format: 'uuid' })
  @ApiCreatedResponse({ type: FollowStatusDto })
  @ApiBadRequestResponse({ description: '자기 자신은 팔로우할 수 없음' })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  follow(@Param('id') _id: string): Promise<FollowStatusDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Delete('follow')
  @ApiOperation({ summary: '언팔로우' })
  @ApiParam({ name: 'id', description: '언팔로우할 대상 사용자 id', format: 'uuid' })
  @ApiOkResponse({ type: FollowStatusDto })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  unfollow(@Param('id') _id: string): Promise<FollowStatusDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get('followers')
  @ApiOperation({ summary: '팔로워 목록' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: PaginatedUsersDto })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  followers(
    @Param('id') _id: string,
    @Query() _query: PaginationQueryDto,
  ): Promise<PaginatedUsersDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }

  @Get('following')
  @ApiOperation({ summary: '팔로잉 목록' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: PaginatedUsersDto })
  @ApiNotFoundResponse({ description: '사용자를 찾을 수 없음' })
  following(
    @Param('id') _id: string,
    @Query() _query: PaginationQueryDto,
  ): Promise<PaginatedUsersDto> {
    // be-impl 단계에서 구현
    throw new NotImplementedException();
  }
}
