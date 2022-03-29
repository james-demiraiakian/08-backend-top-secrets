const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { signIn } = require('../lib/services/UserService');

const mockUser = {
  firstName: 'User',
  lastName: 'Name',
  email: 'test@defense.gov',
  password: '12345678',
};

describe('08-backend-top-secret users routes', () => {
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
    await request(app).post('/api/v1/users').send(mockUser);
    const { email, password } = mockUser;
    const user = await signIn({ email, password });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email, password });

    expect(res.body).toEqual({ message: 'Signed in successfully', user });
  });

  it('returns 401 on an invalid email', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const { email, password } = mockUser;
    await signIn({ email, password });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'qwerty@ewewe.com', password });

    expect(res.body).toEqual({ message: 'invalid email', status: 401 });
  });

  it('returns 401 on ', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const { email, password } = mockUser;
    await signIn({ email, password });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email, password: 'wdwadasdwasdada' });

    expect(res.body).toEqual({ message: 'Invalid password', status: 401 });
  });

  it('logs out via delete function', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const { email, password } = mockUser;
    const user = await signIn({ email, password });

    console.log(user.body);

    const res = await request(app).delete('/api/v1/users/sessions');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out',
    });
  });
});
