// src/middleware/rls.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class RLSMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.cookies['user_id'] as string | undefined;

    if (userId) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.query(`SET app.current_user_id = '${userId}'`);

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      res.on('finish', async () => {
        await queryRunner.query(`RESET app.current_user_id`);
        await queryRunner.release();
      });
    }

    next();
  }
}
