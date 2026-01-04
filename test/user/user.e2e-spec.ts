import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@app/app.module';
import { UsersDto } from '@app/users/users.dto';

const email = 'name@email.com';
const password = '123456';

describe('User entity', () => {
  let app: INestApplication<App>;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (POST)', async () => {
    const user = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Name',
        email,
        password,
      })
      .expect(201)
      .then((res) => res.body as UsersDto);

    userId = user.id;
    expect(userId).toBeDefined();
  });

  it('/ (GET)', async () => {
    const user = await request(app.getHttpServer())
      .get(`/users`)
      .auth(email, password)
      .expect(200)
      .then((res) => res.body as UsersDto);

    expect(user.id).toEqual(userId);
  });

  it('/ (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .auth(email, password)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .auth(email, password)
      .expect(404);
  });
});
