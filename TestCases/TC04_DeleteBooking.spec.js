import { test, expect } from '@playwright/test';
import { Utility } from '../Utilities/Utility';
import { getToken } from '../auth'; 
import { createBooking } from '../booking'; 

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Delete Booking API Tests', () => {
    let token;
    let bookingId;
    
    test.beforeAll(async ({ request }) => {
       
        token = await getToken(request);  
        expect(token).toBeDefined();
        console.log("Token:", token);
        
        
        bookingId = await createBooking(request);  
        expect(bookingId).toBeDefined();
        console.log("Booking ID:", bookingId);
    });

    test('Delete Booking with Valid Booking ID and Data', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json',
            },
        });

       

        
        expect(response.status()).toBe(201); 

        
        const responseBody = await response.text();
        console.log("Reponse Body : ",responseBody)
        expect(responseBody).toBe('Created');
    });

    test('Delete Booking with Invalid Path', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/book/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json',
            },
        });

        
        
        expect(response.status()).toBe(404);
        
        
        const responseBody = await response.text();
        console.log("Reponse Body : ",responseBody)
        expect(responseBody).toContain('Not Found'); 
    });
});
