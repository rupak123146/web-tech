const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route to show login page (GET)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Car Booking Login</title>
      <style>
        body {
          background-color: #f0f8ff;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        form {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        h2 {
          color: #333;
        }
        input {
          padding: 8px;
          width: 100%;
          margin-top: 5px;
        }
        button {
          padding: 10px 20px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <h2>Login to Car Booking</h2>
      <form action="/login" method="POST">
        <label>Username:</label><br>
        <input type="text" name="username" required><br><br>
        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `);
});

// Handle login form submission (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    res.send(`
      <html>
      <body style="background-color: #e0ffe0; font-family: Arial; text-align: center; padding: 50px;">
        <h2>Welcome ${username}, login successful!</h2>
        <p><a href="/dashboard" style="color: blue; text-decoration: none;">Proceed to Dashboard</a></p>
      </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
      <body style="background-color: #ffe0e0; font-family: Arial; text-align: center; padding: 50px;">
        <h2>Login failed! Invalid credentials.</h2>
        <p><a href="/" style="color: red; text-decoration: none;">Try again</a></p>
      </body>
      </html>
    `);
  }
});

// Dashboard page
app.get('/dashboard', (req, res) => {
  res.send(`
    <html>
    <body style="background-color: #f9f9f9; font-family: Arial; text-align: center; padding: 40px;">
      <h2>🚗 Car Booking Dashboard</h2>
      <p>Welcome to your dashboard. Start booking your car below!</p>
      <a href="/book">
        <button style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px;">
          Book a Car
        </button>
      </a>
    </body>
    </html>
  `);
});

// Book car page
app.get('/book', (req, res) => {
  res.send(`
    <html>
    <body style="background-color: #fffbe6; font-family: Arial; text-align: center; padding: 40px;">
      <h2>🚘 Available Car for Booking</h2>
      <div style="margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; width: 300px; background-color: white;">
        <p><strong>Car Name:</strong> Honda City</p>
        <p><strong>Model:</strong> 2022</p>
        <p><strong>Color:</strong> Metallic Grey</p>
        <p><strong>Seats:</strong> 5</p>
        <p><strong>Rent Per Day:</strong> ₹2000</p>
        <button onclick="alert('Booking Confirmed!')" 
                style="padding: 10px 20px; background-color: #007BFF; color: white; border: none; border-radius: 5px;">
          Confirm Booking
        </button>
      </div>
      <a href="/dashboard" style="display: inline-block; margin-top: 20px; color: blue; text-decoration: none;">⬅ Back to Dashboard</a>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
