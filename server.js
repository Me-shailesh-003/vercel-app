const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// In-memory storage for shayari (for demonstration purposes)
let shayariList = [];

// Route to serve index.html (the homepage)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle posting shayari
app.post('/api/shayari', (req, res) => {
  const { poet, shayari } = req.body;
  if (poet && shayari) {
    // Add shayari to the list
    shayariList.push({ poet, shayari });
    res.json({ message: 'Shayari posted successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid shayari data!' });
  }
});

// Route to get all shayari
app.get('/api/shayari', (req, res) => {
  res.json(shayariList);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
