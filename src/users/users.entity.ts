import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '@app/users/users.dto';

@Entity('users')
@Index(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
