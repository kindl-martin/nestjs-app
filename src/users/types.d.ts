import { User } from '@app/users/users.entity';

declare module 'express' {
  interface Request {
    user: User;
  }
}
