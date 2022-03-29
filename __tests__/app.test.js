const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { signIn } = require('../lib/services/UserService');
const User = require('../lib/models/User/User');

const mockUser = {
  firstName: 'User',
  lastName: 'Name',
  email: 'test@defense.gov',
  password: '12345678',
};

describe('08-backend-top-secret routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(Number),
      firstName,
      lastName,
      email,
    });
  });

  it('logs in a user', async () => {
    const { email, password } = mockUser;
    const user = await signIn({ email, password });

    const res = await User.post('/api/v1/users/sessions');

    expect(res.body).toEqual({ message: 'Signed in successfully', user });
  });
});
