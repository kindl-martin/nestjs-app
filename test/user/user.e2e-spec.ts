import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@app/app.module';
import { User } from '@app/users/users.entity';

describe('User entity', () => {
  const email = 'name@icloud.com';
  const password = '123456';
  let app: INestApplication<App>;
  let userId: string;
  let jwtToken: string;

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

  it('create user', async () => {
    const user = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Name',
        email,
        password,
      })
      .expect(201)
      .then((res) => res.body as User);

    userId = user.id;
    expect(userId).toBeDefined();
  });

  it('login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(201);

    const body = response.body as { accessToken: string };
    jwtToken = body.accessToken;
    expect(jwtToken).toBeDefined();
  });

  it('get user', async () => {
    const user = await request(app.getHttpServer())
      .get(`/users`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((res) => res.body as User);

    expect(user.id).toEqual(userId);
  });

  it('delete user', async () => {
    await request(app.getHttpServer())
      .delete(`/users`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/users`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});
