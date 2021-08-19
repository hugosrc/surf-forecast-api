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
        .set({ 'x-access-token': token })
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
        .set({ 'x-access-token': token })
        .send(newBeach);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        error: 'Bad Request',
        message:
          'Beach validation failed: lat: Cast to Number failed for value "invalid-string" at path "lat"',
      });
    });
  });
});
