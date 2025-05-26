
let token;

async function getToken(request) {  
  if (!token) {
    const loginData = { username: 'admin', password: 'password123' };

    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: loginData,
      headers: { 'Content-Type': 'application/json' },
    });

    const responseBody = await response.json();
    token = responseBody.token;
  }
  return token;
}

module.exports = { getToken };
