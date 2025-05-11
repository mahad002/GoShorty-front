const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = 'localhost:3000';

app.use(cors());
app.use(bodyParser.json());

// Mock users database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    surname: 'Bloggs',
    dateOfBirth: '27/04/1990',
    postcode: 'SE1 2AB',
    name: 'Test User'
  }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { email, surname, dateOfBirth, postcode } = req.body;
  
  const user = users.find(u => 
    u.email === email && 
    u.surname === surname &&
    u.dateOfBirth === dateOfBirth &&
    u.postcode === postcode
  );
  
  if (user) {
    // Don't send sensitive data back to the client
    const { dateOfBirth, postcode, ...userWithoutSensitiveData } = user;
    res.status(200).json({
      ...userWithoutSensitiveData,
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected endpoint example
app.get('/profile', (req, res) => {
  // In a real app, you would verify the JWT token here
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    res.status(200).json({ message: 'Protected data accessed successfully' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log(`Server running at ${server}`);
}); 