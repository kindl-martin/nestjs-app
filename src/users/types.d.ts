declare module 'express' {
  import { User } from '@app/users/users.entity';

  interface Request {
    user: User;
  }
}
