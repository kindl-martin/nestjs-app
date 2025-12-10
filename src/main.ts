import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { BasicAuthGuard } from './auth/basic-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new BasicAuthGuard());

  app.enableCors({
    origin: 'http://localhost:5173',
    maxAge: 3600,
  });

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0', () =>
    console.log('Server is running on 0.0.0.0:3000'),
  );
}

bootstrap().catch((err) => console.error(err));
