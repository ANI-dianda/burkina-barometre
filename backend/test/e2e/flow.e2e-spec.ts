import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('API flow (e2e)', () => {
  let app: INestApplication;

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

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  it('register -> login -> create avis -> list services', async () => {
    const phone = `+2267000${Math.floor(Math.random() * 9000 + 1000)}`;

    // register
    const reg = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ phoneNumber: phone })
      .expect(201);

    expect(reg.body).toBeDefined();

    // login (uses the test OTP '123456' in this project)
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ phoneNumber: phone, otp: '123456' })
      .expect(201);

    // safe access to response body (supertest Response.body has type any)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    expect(login.body.accessToken).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token = login.body.accessToken;

    // get services to find a valid serviceId
    const servicesRes = await request(app.getHttpServer())
      .get('/services')
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const services = servicesRes.body.value || servicesRes.body;
    // Array.isArray receives `any` here from supertest body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(Array.isArray(services)).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(services.length).toBeGreaterThan(0);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const serviceId = services[0].id;

    // create avis
    const avisBody = {
      ratingAccueil: 4,
      ratingDelai: 4,
      ratingResolution: 5,
      comment: 'E2E test avis',
      serviceId,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const createAvis = await request(app.getHttpServer())
      .post('/avis')
      .set('Authorization', `Bearer ${token}`)
      .send(avisBody)
      .expect(201);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    expect(createAvis.body.id).toBeDefined();

    // final sanity check: list services again
    await request(app.getHttpServer()).get('/services').expect(200);
  }, 20000);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
});
