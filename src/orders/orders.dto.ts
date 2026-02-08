import { OrderState } from '@app/orders/orders.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderState)
  state?: OrderState;
  description?: string;
}

export class OrderDto {
  id: string;
  state: OrderState;
  createdAt: Date;
  description?: string;
}
