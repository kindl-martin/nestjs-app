import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { User } from '@app/users/users.entity';
import { UpdateOrderDto } from '@app/orders/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findAll(user: User): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user },
      relations: ['user'],
    });
  }

  async findOne(user: User, id: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id, user },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async update(user: User, id: string, orderUpdateDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id, user },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (orderUpdateDto.state !== undefined) order.state = orderUpdateDto.state;
    if (orderUpdateDto.description !== undefined)
      order.description = orderUpdateDto.description;

    const newOrder = await this.orderRepository.save(order);
    return newOrder.toDto();
  }

  async delete(user: User, id: string) {
    const order = await this.orderRepository.findOne({
      where: { id, user },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.orderRepository.delete(id);
  }
}
