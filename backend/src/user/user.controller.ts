import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { AuthenticatedUser } from '../common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from './user.schema';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Get('/me')
  @Authenticated()
  me(@AuthenticatedUser() user: IUser): UserResponseDto {
    return new UserResponseDto(user.toJSON());
  }
}
