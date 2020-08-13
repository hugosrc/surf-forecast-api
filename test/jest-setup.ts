import supertest from 'supertest';
import { SetupServer } from '@src/server';

let server: SetupServer 

beforeAll(async () => {
  server = new SetupServer();

  await server.init();

  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  await server.close()
})
