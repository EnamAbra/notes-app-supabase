// AddNote.jsx
import React, { useState, useEffect } from 'react';
import './AddNote.css';

const MAX_CHARS = 500;

const AddNote = ({ note, onClose, onSave }) => {
  // Initialize state with existing note if editing
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);

  // Update state if note prop changes (editing a different note)
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setIsPinned(note.isPinned || false);
    } else {
      setTitle('');
      setContent('');
      setIsPinned(false);
    }
  }, [note]);

  const isContentValid = content.length <= MAX_CHARS;
  const isFormValid = title.trim() && content.trim() && isContentValid;
  const remainingChars = MAX_CHARS - content.length;

  const handleSave = () => {
    if (!onSave) return;
    const newNote = {
      title: title.trim(),
      content: content.trim(),
      isPinned,
      lastEdited: new Date().toISOString(),
      ...(note?.id && { id: note.id }), // Preserve id if editing
    };
    onSave(newNote);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="add-note-overlay">
      <div className="add-note-content">
        <h2 className="add-note-title">{note ? 'Edit Note' : 'Create New Note'}</h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-note-input note-title-input"
        />

        {/* Content Editor */}
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          className="add-note-input note-textarea"
        />

        {/* Footer: Char count and pin toggle */}
        <div className="add-note-footer">
          <p className={`char-count ${!isContentValid ? 'count-invalid' : ''}`}>
            Character Count: {content.length} / {MAX_CHARS}
            {remainingChars < 50 && ` (Remaining: ${remainingChars})`}
          </p>

          <label className="pin-toggle-label">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="pin-checkbox"
            />
            <span>Pin Note</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="add-note-actions">
          <button onClick={handleClose} className="btn-note-cancel">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className="btn-note-save"
          >
            {note ? 'Save Changes' : 'Save Note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
