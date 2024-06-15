import React, { useState } from 'react';
import '../styles/Note.css'; // Make sure this path is correct

function Note() {
  const [notes, setNotes] = useState('');

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  console.log('Note component is rendering'); // This will log in the console when Note renders

  return (
    <div className="note">
      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Type your notes here..."
      />
    </div>
  );
}

export default Note;
