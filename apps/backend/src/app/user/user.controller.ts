import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppUser } from './user.schema';
import { ReqUser } from '../common/decorators/user.decorator';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UserController {
  @ApiOkResponse({
    description: 'Returns the current user.',
    type: UserResponseDto,
  })
  @Get('/me')
  @Authenticated()
  me(@ReqUser() user: AppUser): UserResponseDto {
    return plainToClass(UserResponseDto, user.toJSON());
  }
}
