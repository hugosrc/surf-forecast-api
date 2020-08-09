import supertest from 'supertest';
import { SetupServer } from '@src/server';

beforeAll(() => {
  const server = new SetupServer();

  server.init();

  global.testRequest = supertest(server.getApp());
});
