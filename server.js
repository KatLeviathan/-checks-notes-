const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from 'develop/public' directory
app.use(express.static(path.join(__dirname, 'develop', 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop', 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'develop', 'public', 'notes.html'));
});

// POST route for saving notes
app.post('/notes', (req, res) => {
  const { title, text } = req.body;

  // Assuming you would save the note data to a database or handle it as required
  console.log('Received POST request to save note:', title, text);

  // Respond with a success message or saved note data
  res.status(201).json({ id: 'unique_id_generated', title, text });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
