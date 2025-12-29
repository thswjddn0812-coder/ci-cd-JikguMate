export class JwtConstants {
  static readonly secret = 'secretKey'; // 실무에서는 환경변수로 관리해야 합니다.
  static readonly refreshSecret = 'refreshSecretKey';
}
