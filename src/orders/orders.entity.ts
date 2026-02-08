import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { OrderState } from './orders.enum';
import { OrderDto } from '@app/orders/orders.dto';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.NEW,
  })
  state: OrderState;

  @Column({ nullable: true })
  description?: string;

  toDto(): OrderDto {
    return {
      id: this.id,
      state: this.state,
      createdAt: this.createdAt,
      description: this.description,
    };
  }
}
