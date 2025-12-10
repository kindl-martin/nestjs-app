import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderState } from '@app/orders/orders.enum';
import type { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async findAll(@Req() req: Request) {
    return this.ordersService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    return this.ordersService.findOne(req.user, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request) {
    return this.ordersService.create({
      user: req.user,
      state: OrderState.NEW,
    });
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.ordersService.delete(req.user, id);
  }
}
