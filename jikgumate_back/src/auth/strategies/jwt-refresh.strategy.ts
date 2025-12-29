import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import { JwtConstants } from '../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: JwtConstants.refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.cookies?.Refresh;
    const user = await this.usersService.findOneById(payload.sub);

    if (!user || user.refreshToken !== refreshToken) {
      // DB에 저장된 토큰과 비교 (선택사항이지만 보안상 좋음)
      // 단순히 토큰 유효성만 체크하려면 DB비교 생략가능하지만, RefreshToken Rotation등을 위해 체크 권장
      throw new UnauthorizedException();
    }
    return user;
  }
}
