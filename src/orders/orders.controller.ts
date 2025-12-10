import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderState } from '@app/orders/orders.enum';
import { Request as RequestExpress } from 'express';
import { User } from '@app/users/users.entity';

interface AuthenticatedRequest extends RequestExpress {
  user: User;
}

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: AuthenticatedRequest) {
    return this.ordersService.create({
      user: req.user,
      state: OrderState.NEW,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
