import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { toMeDto } from '../users/user.mapper';
import { JwtPayload } from './interfaces/authenticated-user.interface';

const BCRYPT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    // username / email 중복 검사 → 409
    const existing = await this.userRepo.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });
    if (existing) {
      const field = existing.username === dto.username ? 'username' : 'email';
      throw new ConflictException(`이미 사용 중인 ${field} 입니다.`);
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const user = this.userRepo.create({
      username: dto.username,
      email: dto.email,
      passwordHash,
      name: dto.name ?? null,
    });
    const saved = await this.userRepo.save(user);

    return this.buildAuthResponse(saved);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    // 계정 존재 여부와 비밀번호 불일치를 구분하지 않고 동일한 401 반환
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: User): AuthResponseDto {
    const payload: JwtPayload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: toMeDto(user) };
  }
}
