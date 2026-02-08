import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderState } from '@app/orders/orders.enum';
import { UpdateOrderDto } from '@app/orders/orders.dto';
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

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: string,
  ) {
    return this.ordersService.update(req.user, id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.ordersService.delete(req.user, id);
  }
}
