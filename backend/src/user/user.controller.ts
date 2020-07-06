import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { ReqUser } from '../common/decorators/user.decorator';
import { AuthUser } from '../auth/auth-user.model';

@Controller('user')
export class UserController {
  @Get('/me')
  @Authenticated()
  me(@ReqUser() user: AuthUser): UserResponseDto {
    return new UserResponseDto(user.nativeUser.toJSON());
  }
}
