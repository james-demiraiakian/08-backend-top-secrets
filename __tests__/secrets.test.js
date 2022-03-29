const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { signIn } = require('../lib/services/UserService');

const mockSecret = {
  text: 'Test Secret',
  description: 'This is a test secret',
};

describe('08-backend-top-secret secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});
