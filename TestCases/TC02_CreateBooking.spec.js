import { test, expect } from '@playwright/test';
import { Utility } from '../Utilities/Utility';

const BASE_URL = 'https://restful-booker.herokuapp.com';
let bookingId;

test.describe('Booking API Tests', () => {
  
    test('Create booking with valid data', async ({ request }) => {
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
      
        const response = await request.post(`${BASE_URL}/booking`, {
          data: bookingData
        });
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody.booking).toHaveProperty('firstname');
        expect(responseBody.booking).toHaveProperty('lastname');
        
        bookingId = responseBody.bookingid; 
        console.log('Booking ID is', bookingId);
      });
      
  test('Create booking with invalid method', async ({ request }) => {
    const bookingData = {
      firstname: Utility.NameGenerator.generateRandomFirstName(),
      lastname: 'Rifaat',
      totalprice: Utility.RandomNumberGenerator.generateRandomInteger(),
      depositpaid: true,
      additionalneeds: 'breakfast',
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-12-20'
      }
    };

    const response = await request.put(`${BASE_URL}/booking`, {
      data: bookingData
    });

    expect(response.status()).toBe(404);
  });

  test('Create booking with invalid payload', async ({ request }) => {
    const bookingData = {
      F: Utility.NameGenerator.generateRandomFirstName(),
      lastname: 'Rifaat',
      totalprice: Utility.RandomNumberGenerator.generateRandomInteger(),
      depositpaid: true,
      additionalneeds: 'breakfast',
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-12-20'
      }
    };

    const response = await request.post(`${BASE_URL}/booking`, {
      data: bookingData
    });

    expect(response.status()).toBe(500);
  });

  test('Create booking with invalid path', async ({ request }) => {
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

    const response = await request.post(`${BASE_URL}/book`, {
      data: bookingData
    });

    expect(response.status()).toBe(404);
  });
});
