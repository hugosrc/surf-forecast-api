import { Beach } from '@src/models/beach';
import { User } from '@src/models/user';
import { AuthService } from '@src/services/auth';

describe('Beaches functional tests', () => {
  const defaultUser: User = {
    name: 'John',
    email: 'john@mail.com',
    password: '1234',
  };

  let token: string;
  let createdBeachId: string;

  beforeEach(async () => {
    await Beach.deleteMany({});
    await User.deleteMany({});

    const user = await new User(defaultUser).save();
    token = AuthService.gerenateToken(user.toJSON());
  });

  describe('When creating a new beach', () => {
    it('should create a beach with success', async () => {
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      const response = await global.testRequest
        .post('/beaches')
        .set({ authorization: 'Bearer ' + token })
        .send(newBeach);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });

    it('should return a validation error', async () => {
      const newBeach = {
        lat: 'invalid-string',
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      const response = await global.testRequest
        .post('/beaches')
        .set({ authorization: 'Bearer ' + token })
        .send(newBeach);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        error: 'Bad Request',
        message: 'request.body.lat should be number',
      });
    });
  });

  describe('When updating a beach', () => {
    beforeEach(async () => {
      await Beach.deleteMany({});
      await User.deleteMany({});

      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };

      const createdBeachResponse = await global.testRequest
        .post('/beaches')
        .set({ authorization: 'Bearer ' + token })
        .send(newBeach);

      createdBeachId = createdBeachResponse.body.id;
    });

    it('should update a beach with success', async () => {
      const updatedBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Dunbar Beach',
        position: 'E',
      };

      const response = await global.testRequest
        .put(`/beaches/${createdBeachId}`)
        .set({ authorization: 'Bearer ' + token })
        .send(updatedBeach);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(updatedBeach));
    });

    it('should return a beach not found error', async () => {
      const updatedBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Dunbar Beach',
        position: 'E',
      };

      const invalidBeachId = '507f191e810c19729de860ea';

      const response = await global.testRequest
        .put(`/beaches/${invalidBeachId}`)
        .set({ authorization: 'Bearer ' + token })
        .send(updatedBeach);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        code: 404,
        message: 'Beach not found',
        error: 'Not Found',
      });
    });

    it('should return a beach validation error', async () => {
      const updatedBeach = {
        lat: -33.792726,
        lng: 'invalid-lng',
        name: 'Dunbar Beach',
        position: 'E',
      };

      const invalidBeachId = '507f191e810c19729de860ea';

      const response = await global.testRequest
        .put(`/beaches/${invalidBeachId}`)
        .set({ authorization: 'Bearer ' + token })
        .send(updatedBeach);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        message: 'request.body.lng should be number',
        error: 'Bad Request',
      });
    });

    it('should return forbidden error when user tries to update another users beach', async () => {
      const updatedBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Dunbar Beach',
        position: 'E',
      };

      const newUser: User = {
        name: 'Fake',
        email: 'fake@mail.com',
        password: '1234',
      };
      const user = await User.create(newUser);
      const token = AuthService.gerenateToken(user.toJSON());

      const response = await global.testRequest
        .put(`/beaches/${createdBeachId}`)
        .set({ authorization: 'Bearer ' + token })
        .send(updatedBeach);

      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        code: 403,
        message: 'Forbidden',
        error: 'Forbidden',
      });
    });
  });
});
