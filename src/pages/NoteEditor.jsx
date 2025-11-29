// components/NoteEditor.jsx
import React, { useState, useEffect } from 'react';
import '../pages/NoteEditor.css'

const MAX_CHARS = 500;

/**
 * Modal component for editing or creating a note.
 */
const NoteEditor = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);

  useEffect(() => {
    // Sync state when a new note is passed (for editing)
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setIsPinned(note?.isPinned || false);
  }, [note]);

  const handleSave = () => {
    const updatedNote = {
      ...note,
      title,
      content,
      isPinned,
      lastEdited: new Date().toISOString(), // Update last edited timestamp
    };
    onSave(updatedNote);
    onClose();
  };

  const remainingChars = MAX_CHARS - content.length;
  const isContentValid = content.length <= MAX_CHARS;

  // Good programming practice: Use a Portal for Modals in production, 
  // but for simplicity, we use standard conditional rendering here.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 transition-transform transform ${note ? 'scale-100' : 'scale-95'}`}>
        <h2 className="text-2xl font-bold mb-4">{note ? 'Edit Note' : 'Add New Note'}</h2>
        
        {/* Title Input */}
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-semibold p-3 mb-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Content Editor Area */}
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
        
        {/* Character Count Area */}
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${isContentValid ? 'text-gray-500' : 'text-red-500 font-bold'}`}>
            Character Count: {content.length} / {MAX_CHARS} 
            {remainingChars < 20 && ` (Remaining: ${remainingChars})`}
          </p>
          
          {/* Pin Toggle */}
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="form-checkbox h-4 w-4 text-yellow-500 rounded border-gray-300"
            />
            <span>Pin Note</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || !isContentValid}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;