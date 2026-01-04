import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LoginDto } from '@app/auth/login.dto';
import { Public } from '@app/auth/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    return this.authService.login(user);
  }
}
