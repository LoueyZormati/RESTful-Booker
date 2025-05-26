const { getToken } = require('./auth');  
const { request } = require('@playwright/test');

let bookingId;

async function createBooking(request) {
  if (!bookingId) {
    const token = await getToken(request); 
    const bookingData = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-12-20'
      }
    };

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
      data: bookingData,
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    const responseBody = await response.json();
    bookingId = responseBody.bookingid;
  }
  return bookingId;
}

module.exports = { createBooking };
