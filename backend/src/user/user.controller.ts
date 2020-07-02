import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  @Get('/me')
  me(): UserResponseDto {
    return new UserResponseDto();
  }
}
