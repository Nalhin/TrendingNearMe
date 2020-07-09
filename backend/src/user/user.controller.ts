import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AppUser } from './user.schema';
import { ReqUser } from '../common/decorators/user.decorator';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Get('/me')
  @Authenticated()
  me(@ReqUser() user: AppUser): UserResponseDto {
    return plainToClass(UserResponseDto, user.toJSON());
  }
}
