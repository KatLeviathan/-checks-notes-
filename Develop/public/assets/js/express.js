const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route to handle getting all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes data' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Route to handle adding a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes data' });
      return;
    }
    const notes = JSON.parse(data);
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write notes data' });
        return;
      }
      res.json(newNote);
    });
  });
});

// Route to handle deleting a note
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes data' });
      return;
    }
    let notes = JSON.parse(data);
    const filteredNotes = notes.filter(note => note.id !== noteId);
    if (filteredNotes.length === notes.length) {
      res.status(404).json({ error: `Note with ID ${noteId} not found` });
      return;
    }
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(filteredNotes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write notes data' });
        return;
      }
      res.json({ success: true });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});