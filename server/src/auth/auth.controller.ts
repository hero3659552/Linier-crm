import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string) {
    const result = this.service.login(username, password);
    if (!result) return { statusCode: 401, message: '用户名或密码错误' };
    return result;
  }
}
