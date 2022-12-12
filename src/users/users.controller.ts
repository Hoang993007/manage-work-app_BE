import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('User')
@Controller('users')
export class UsersController {
  @Get('user')
  async getAllUsers() {
    
  }
}
