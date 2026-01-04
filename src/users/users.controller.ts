import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Request } from 'express';
import { Public } from '@app/auth/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUser(@Req() req: Request) {
    return this.userService.findOne(req.user.id);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userData: Partial<User>) {
    return this.userService.create(userData);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return this.userService.delete(req.user.id);
  }
}
