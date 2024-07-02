document.addEventListener('DOMContentLoaded', function () {
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const clearBtn = document.querySelector('.clear-btn');
  const listGroup = document.getElementById('list-group');
  const noteTitleInput = document.querySelector('.note-title');
  const noteTextarea = document.querySelector('.note-textarea');

  // Save note button click event
  saveNoteBtn.addEventListener('click', function () {
    const title = noteTitleInput.value.trim();
    const text = noteTextarea.value.trim();

    if (title && text) {
      saveNoteToServer(title, text);
      clearForm();
    }
  });

  // New note button click event
  newNoteBtn.addEventListener('click', function () {
    clearForm();
  });

  // Clear form button click event
  clearBtn.addEventListener('click', function () {
    clearForm();
  });

  // Function to save note to the server
  function saveNoteToServer(title, text) {
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, text })
    })
    .then(response => {
        if (response.ok) {
            // Note saved successfully
            // You can update the UI here if needed
            console.log('Note saved successfully');
        } else {
            throw new Error('Failed to save note');
        }
    })
    .catch(error => {
        console.error('Error saving note:', error);
        // Handle error
    });
}


  // Function to clear the form
  function clearForm() {
    noteTitleInput.value = '';
    noteTextarea.value = '';
  }
});
