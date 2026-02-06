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
import { Request } from 'express';
import { Public } from '@app/auth/public.decorator';
import { CreateUserDto } from '@app/users/users.dto';

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
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete()
  async delete(@Req() req: Request) {
    return this.userService.delete(req.user.id);
  }
}
