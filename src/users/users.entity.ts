import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@Index(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', select: false, nullable: false })
  password: string;
}
