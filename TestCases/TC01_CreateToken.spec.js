import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';
let token = '';

test.describe('Token Creation Tests', () => {
  
  test('Create Token with valid Data', async ({ request }) => {
    const loginData = { username: 'admin', password: 'password123' };

    const response = await request.post(`${BASE_URL}/auth`, {
      data: loginData,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    token = responseBody.token;

    expect(token).toBeTruthy();
    expect(token.length).toBeGreaterThanOrEqual(7);
    console.log('Token Value is', token);
  });

  test('Create Token With Invalid Action Method', async ({ request }) => {
    const loginData = { username: 'admin', password: 'password123' };

    const response = await request.get(`${BASE_URL}/auth`, {
      data: loginData,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(404);
    console.log('Response is', await response.text());
  });

  test('Create Token with Invalid Credentials', async ({ request }) => {
    const loginData = { username: 'admin123', password: 'password123' };

    const response = await request.post(`${BASE_URL}/auth`, {
      data: loginData,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('Create Token with Invalid Path', async ({ request }) => {
    const loginData = { username: 'admin', password: 'password123' };

    const response = await request.post(`${BASE_URL}/aut`, {
      data: loginData,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(404);
    expect(await response.text()).toMatch(/Not Found/);
  });
});
