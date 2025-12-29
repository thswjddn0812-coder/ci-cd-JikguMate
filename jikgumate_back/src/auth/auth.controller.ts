import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() req: any, @Res({ passthrough: true }) res: Response) {
    // Note: In a real app, use LocalGuard to validate credentials and populate req.user
    // Here implementing manual validation for simplicity as per previous context or assuming pre-validation
    const user = await this.authService.validateUser(req.email, req.password);
    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).send('Invalid credentials');
      return;
    }

    const tokens = await this.authService.login(user);

    res.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure: true, // Enable in production with HTTPS
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    await this.authService.logout(user.sub);
    res.clearCookie('Refresh');
    return true;
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    // 'refreshToken' is attached to req.user by JwtRefreshStrategy check
    const tokens = await this.authService.refresh(user.sub, user.refreshToken);

    res.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }
}
