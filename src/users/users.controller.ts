import { Controller, Post, Body, Get, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/pass')
  async generatePass(@Body() data: { username: string; id: number }) {
    return await this.usersService.generatePass(data);
  }

  @Get('/pass')
  async validatePass(@Query('uuid') uuid: string) {
    return await this.usersService.validatePass(uuid);
  }

  @Delete('/pass')
  async deletePass(@Query('uuid') uuid: string) {
    return await this.usersService.deletePass(uuid);
  }
}
