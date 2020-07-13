import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../user/dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Logs account with provided data.',
    type: AuthUserResponseDto,
  })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<AuthUserResponseDto> {
    return this.authService.login(loginUserDto);
  }

  @ApiCreatedResponse({
    description: 'Registers account with provided data.',
    type: AuthUserResponseDto,
  })
  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthUserResponseDto> {
    return this.authService.register(registerUserDto);
  }
}
