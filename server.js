const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Body parsing middleware
app.use(express.json()); // For parsing application/json

// Enable CORS for all origins during development
app.use(cors());

// Serve static files from the 'develop/public' directory
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});


// POST route for saving notes
app.post('/notes', (req, res) => {
  const { title, text } = req.body;

  console.log('Received POST request to save note:', title, text);

  // Respond with a success message or saved note data
  res.status(201).json({ id: 'unique_id_generated', title, text });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
