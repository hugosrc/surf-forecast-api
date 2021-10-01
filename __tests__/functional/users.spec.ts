import { User } from '@src/models/user';

describe('Users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('When creating a new user', () => {
    it('should successfully create a new user', async () => {
      const newUser = {
        name: 'John',
        email: 'john@mail.com',
        password: '1234',
      };

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            id: expect.any(String),
            name: newUser.name,
            email: newUser.email,
          },
          token: expect.any(String),
        })
      );
    });

    it('should return a validation error when a field is missing', async () => {
      const newUser = {
        email: 'john@mail.com',
        password: '1234',
      };

      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        error: 'Bad Request',
        message: 'User validation failed: name: Path `name` is required.',
      });
    });

    it('should return 409 when the email already exists', async () => {
      const newUser = {
        name: 'John',
        email: 'john@mail.com',
        password: '1234',
      };

      await global.testRequest.post('/users').send(newUser);
      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: 'Conflict',
        message:
          'User validation failed: email: already exists in the database.',
      });
    });
  });

  describe('When authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'John',
        email: 'john@mail.com',
        password: '1234',
      };

      await new User(newUser).save();

      const response = await global.testRequest
        .post('/users/authenticate')
        .send({
          email: 'john@mail.com',
          password: '1234',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            id: expect.any(String),
            name: newUser.name,
            email: newUser.email,
          },
          token: expect.any(String),
        })
      );
    });

    it('should return UNAUTHORIZED if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/users/authenticate')
        .send({
          email: 'some-email@mail.com',
          password: '1234',
        });

      expect(response.status).toBe(401);
    });

    it('should return UNAUTHORIZED if the user is found but the password does not match', async () => {
      const newUser = {
        name: 'John',
        email: 'john@mail.com',
        password: '1234',
      };

      await new User(newUser).save();

      const response = await global.testRequest
        .post('/users/authenticate')
        .send({
          email: 'some-email@mail.com',
          password: 'different-password',
        });

      expect(response.status).toBe(401);
    });
  });
});
