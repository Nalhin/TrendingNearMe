import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<AuthUserResponseDto> {
    return this.authService.login(loginUserDto);
  }

  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthUserResponseDto> {
    return this.authService.register(registerUserDto);
  }
}
