const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'User',
  lastName: 'Name',
  email: 'test@defense.gov',
  password: '12345678',
};

const mockSecret = {
  title: 'Test Secret',
  description: 'This is a test secret',
};

describe('08-backend-top-secret secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('tests that a secret can be entered', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);
    const { email, password } = mockUser;
    await agent.post('/api/v1/users/sessions').send({ email, password });

    const res = await agent.post('/api/v1/secrets').send(mockSecret);
    const { title, description } = mockSecret;

    expect(res.body).toEqual({
      id: expect.any(Number),
      title,
      description,
      createdAt: expect.any(String),
    });
  });

  it('tests that a list of secrets can be grabbed', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);
    const { email, password } = mockUser;
    await agent.post('/api/v1/users/sessions').send({ email, password });

    for (let i = 0; i < 10; i++) {
      await agent.post('/api/v1/secrets').send(mockSecret);
    }

    const expected = [
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
      {
        id: expect.any(Number),
        title: 'Test Secret',
        description: 'This is a test secret',
        createdAt: expect.any(String),
      },
    ];

    const res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual(expected);
  });
});
