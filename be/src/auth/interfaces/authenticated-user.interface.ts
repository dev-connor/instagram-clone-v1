// JwtStrategy.validate() 가 반환하고 req.user 에 주입되는 인증 사용자 정보
export interface AuthenticatedUser {
  userId: string;
  username: string;
}

// JWT 페이로드 구조
export interface JwtPayload {
  sub: string; // userId
  username: string;
}
