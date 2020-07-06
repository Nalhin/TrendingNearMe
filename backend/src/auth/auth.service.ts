import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/user.schema';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signToken(user: IUser): Promise<AuthUserResponseDto> {
    const payload = { username: user.username };
    return plainToClass(AuthUserResponseDto, {
      user,
      token: this.jwtService.sign(payload),
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthUserResponseDto> {
    const user = await this.userService.findOneByUsername(
      loginUserDto.username,
    );
    if (!user || !(await user.comparePassword(loginUserDto.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return this.signToken(user);
  }

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<AuthUserResponseDto> {
    const savedUser = await this.userService.create(registerUserDto);
    return this.signToken(savedUser);
  }
}
