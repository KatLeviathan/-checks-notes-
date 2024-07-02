document.addEventListener('DOMContentLoaded', function () {
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const clearBtn = document.querySelector('.clear-btn');
  const noteList = document.getElementById('list-group');
  const noteTitleInput = document.querySelector('.note-title');
  const noteTextarea = document.querySelector('.note-textarea');

  // Save note button click event
  saveNoteBtn.addEventListener('click', function () {
    console.log('Save button clicked');
    const title = noteTitleInput.value.trim();
    const text = noteTextarea.value.trim();

    if (title && text) {
      saveNoteToServer(title, text);
      clearForm();
    }
  });

  // Function to save note to the server
  function saveNoteToServer(title, text) {
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, text })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to save note');
      }
    })
    .then(data => {
      // Add saved note to sidebar
      const listItem = createNoteListItem(data.id, title, text);
      noteList.appendChild(listItem);
    })
    .catch(error => {
      console.error('Error saving note:', error);
      // Handle error
    });
  }

  // Function to create a list item for a saved note
  function createNoteListItem(id, title, text) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.dataset.noteId = id;
    listItem.innerHTML = `
      <div>
        <h5>${title}</h5>
        <p>${text}</p>
      </div>
      <button class="btn btn-outline-danger btn-sm delete-note">Delete</button>
    `;
    return listItem;
  }

  // New note button click event
  newNoteBtn.addEventListener('click', function () {
    console.log('New Note button clicked');
    clearForm();
  });

  // Clear form button click event
  clearBtn.addEventListener('click', function () {
    console.log('Clear button clicked');
    clearForm();
  });

  // Function to clear the form
  function clearForm() {
    noteTitleInput.value = '';
    noteTextarea.value = '';
  }

  // Delete note button click event
  noteList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-note')) {
      console.log('Delete note button clicked');
      const noteId = event.target.parentElement.dataset.noteId;
      deleteNoteFromServer(noteId);
      event.target.parentElement.remove();
    }
  });

  // Function to delete note from the server
  function deleteNoteFromServer(noteId) {
    fetch(`/notes/${noteId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
    })
    .catch(error => {
      console.error('Error deleting note:', error);
      // Handle error
    });
  }

});
