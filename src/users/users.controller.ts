import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/pass')
  async generatePass(@Body() data: { username: string; id: number }) {
    return await this.usersService.generatePass(data);
  }

  @Get('/pass')
  async validatePass(pass: string) {
    await this.usersService.validatePass(pass);
  }

  @Delete('/pass')
  async deletePass(pass: string) {
    await this.usersService.deletePass(pass);
  }
}
