import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: any, @Res({ passthrough: true }) res: Response) {
    // 실제로는 Guard를 사용하여 req.user를 가져오는 것이 좋으나,
    // 요청사항에 맞게 간단히 구현하기 위해 Body에서 이메일/비번을 받아 처리하거나
    // 혹은 LocalGuard를 붙여야 함.
    // 여기서는 간단히 Service의 validateUser를 호출하고 토큰을 발급하는 흐름으로 작성.

    const user = await this.authService.validateUser(req.email, req.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.authService.login(user);

    res.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtRefreshToken(refreshToken),
    );

    return {
      accessToken,
      message: 'Login successful',
    };
  }
}
