// Dashboard.jsx
import React, { useState, useMemo, useEffect } from 'react';
import AddNote from './AddNote';
import '../pages/Dashboardmain.css';
import supabase from '../config/SupabaseClient'; // default export

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    return 'Invalid Date';
  }
};

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        setNotes(data);
      }
    };
    fetchNotes();
  }, []);

  // Filtered notes for search
  const filteredNotes = useMemo(() => {
    if (!searchTerm) return notes;
    const lowerSearch = searchTerm.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(lowerSearch) ||
      note.content.toLowerCase().includes(lowerSearch)
    );
  }, [notes, searchTerm]);

  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const normalNotes = filteredNotes.filter(note => !note.pinned);

  // Add or edit note handler
  const handleSaveNote = async (noteData) => {
    try {
      if (noteData.id) {
        // EDIT note
        const { data, error } = await supabase
          .from('notes')
          .update({
            title: noteData.title,
            content: noteData.content,
            pinned: noteData.isPinned,
            updated_at: new Date().toISOString()
          })
          .eq('id', noteData.id)
          .select();

        if (error) throw error;

        setNotes(prevNotes =>
          prevNotes.map(note => (note.id === noteData.id ? data[0] : note))
        );
        setEditingNote(null);

      } else {
        // ADD new note
        const newNote = {
          title: noteData.title,
          content: noteData.content,
          pinned: noteData.isPinned,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('notes')
          .insert([newNote])
          .select();

        if (error) throw error;

        setNotes(prevNotes => [data[0], ...prevNotes]);
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error('Supabase error:', error);
    }
  };

  // Modal open/close
  const openAddModal = () => {
    setEditingNote(null);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditorForEdit = (note) => {
    setIsAddModalOpen(false);
    setEditingNote(note);
  };
  const closeEditModal = () => setEditingNote(null);

  // Single note card
  const NoteItem = ({ note, onEdit, isPinned }) => (
    <div
      className={isPinned ? 'note-card pinned-card' : 'note-card normal-card'}
      style={{ backgroundColor: '#fff' }}
      onClick={() => onEdit(note)}
    >
      <div className="note-content-area">
        <h3>{note.title || 'Untitled Note'}</h3>
        <p>{note.content || 'No content provided.'}</p>
      </div>
      <div className="note-footer">
        {isPinned && <span className="note-pin-status">📌 Pinned</span>}
        <span>Last Edited: {formatDate(note.updated_at)}</span>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-content-header">
        <div className="dashboard-header-controls">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={openAddModal} className="btn-add-note">
            + Add Note
          </button>
          <button className="btn-logout">Logout</button>
        </div>
      </div>

      {/* Main content */}
      <main className="dashboard-main-content">
        {pinnedNotes.length > 0 && (
          <section className="notes-section">
            <h2 className="section-title">📌 Pinned Notes</h2>
            <div className="notes-grid">
              {pinnedNotes.map(note => (
                <NoteItem key={note.id} note={note} onEdit={openEditorForEdit} isPinned={true} />
              ))}
            </div>
          </section>
        )}

        <hr className="section-separator" />

        <section className="notes-section">
          <h2 className="section-title">All Notes</h2>
          {notes.length === 0 && (
            <p className="empty-state-message">
              No notes found. Click "Add Note" above to create your first note!
            </p>
          )}
          <div className="notes-grid">
            {normalNotes.map(note => (
              <NoteItem key={note.id} note={note} onEdit={openEditorForEdit} isPinned={false} />
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      {isAddModalOpen && <AddNote onClose={closeAddModal} onSave={handleSaveNote} />}
      {editingNote && (
        <AddNote
          note={editingNote}
          onClose={closeEditModal}
          onSave={(updatedNote) => handleSaveNote({ ...updatedNote, id: editingNote.id })}
        />
      )}
    </div>
  );
};

export default Dashboard;
