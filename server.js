const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'notebook/develop/public' directory
app.use(express.static(path.join(__dirname, 'develop', 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'develop', 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,  'develop', 'public', 'notes.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
