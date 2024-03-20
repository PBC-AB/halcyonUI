const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

// Set up the token and password
const token = 'vzlis8LR05T55PJeAvzVvyZzOBkPEjaj30GCCAKfXWZB9YbrH5Sqvt23JXzM09UX';
const password = 'whyhellovicar';

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Middleware to check the password
app.use((req, res, next) => {
    const userPassword = req.headers['x-password'];
    if (userPassword !== password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  });

// API endpoint for making the request to the external API
app.post('/api/lead', async (req, res) => {
  const { emailAddress, firstName, lastName, company, jobTitle } = req.body;

  try {
    const response = await axios.post(`http://52.211.86.244:38123/lead?token=${token}`, {
      emailAddress,
      firstName,
      lastName,
      company,
      jobTitle,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
