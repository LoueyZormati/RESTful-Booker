import { test, expect } from '@playwright/test';
import { Utility } from '../Utilities/Utility';
import { getToken } from '../auth'; 
import { createBooking } from '../booking'; 


const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Booking API Tests', () => {
  let token;
  let bookingId;

  test.beforeAll(async ({ request }) => {
    token = await getToken(request);  
    expect(token).toBeDefined();
    console.log("Token:", token);
    
    bookingId = await createBooking(request);  
    
    expect(token).toBeDefined();
    expect(bookingId).toBeDefined();
    console.log("Booking ID:", bookingId);
  });

  test('Update All Booking With Valid Data', async ({ request }) => {
    const bookingData = {
      firstname: Utility.NameGenerator.generateRandomFirstName(),
      lastname: 'Jhonson',
      totalprice: Utility.RandomNumberGenerator.generateRandomInteger(),
      depositpaid: true,
      additionalneeds: 'breakfast',
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-12-20'
      }
    };
  
    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
      data: bookingData,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

   
    expect(responseBody.firstname).toBeDefined();
    expect(responseBody.lastname).toBeDefined();
    expect(responseBody.totalprice).toBeGreaterThan(0);
    expect(responseBody.depositpaid).toBe(true);
    expect(responseBody.bookingdates).toBeDefined();
    expect(responseBody.bookingdates.checkin).toBe('2025-01-01');
    expect(responseBody.bookingdates.checkout).toBe('2025-12-20');

    console.log('Response Body', responseBody);
  });

  test('Partial Update for Firstname and Lastname', async ({ request }) => {
    const bookingData = {
      firstname: 'UpdatedFirstName',
      lastname: 'UpdatedLastName',
    };

    const response = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
      data: bookingData,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    
    expect(responseBody.firstname).toBe('UpdatedFirstName');
    expect(responseBody.lastname).toBe('UpdatedLastName');
  });

  test('Update Booking Using Invalid Method', async ({ request }) => {
    const bookingData = {
      firstname: Utility.NameGenerator.generateRandomFirstName(),
      lastname: 'TestLastName',
      totalprice: Utility.RandomNumberGenerator.generateRandomInteger(),
      depositpaid: true,
      additionalneeds: 'breakfast',
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-12-20'
      }
    };

    const response = await request.post(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
      data: bookingData,
    });

    expect(response.status()).toBe(404);
    const responseBody = await response.text();
    expect(responseBody).toContain('Not Found');
  });

  test('Update Booking With Invalid Path', async ({ request }) => {
    const bookingData = {
      firstname: Utility.NameGenerator.generateRandomFirstName(),
      lastname: 'TestLastName',
      totalprice: Utility.RandomNumberGenerator.generateRandomInteger(),
      depositpaid: true,
      additionalneeds: 'breakfast',
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-12-20'
      }
    };

    const response = await request.put(`${BASE_URL}/book/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
      data: bookingData,
    });

    expect(response.status()).toBe(404);
    const responseBody = await response.text();
    expect(responseBody).toContain('Not Found');
  });

});
