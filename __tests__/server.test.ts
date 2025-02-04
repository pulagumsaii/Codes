const request = require('supertest');
const app = require('../server');

describe('Login Tests', () => {
  it('responds with a redirect to /admin-dashboard when admin logs in', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ username: 'BVRM534202', password: '1234' });

    expect(response.status).toBe(302); // Changed to 302 for redirect
    expect(response.header['location']).toBe('/admin-dashboard'); // Changed to header['location']
  });

  it('responds with a redirect to /player-dashboard when player logs in', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ username: 'user', password: '1234' });

    expect(response.status).toBe(302); // Changed to 302 for redirect
    expect(response.header['location']).toBe('/player-dashboard'); // Changed to header['location']
  });

  it('responds with error for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ username: 'invaliduser', password: 'invalidpassword' });

    expect(response.status).toBe(200); 
  });
});