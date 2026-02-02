import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NotesContext } from "../../context/NotesContext";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteEditor from "../../components/NoteEditor/NoteEditor";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../services/api";



const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { notes, setNotes, fetchNotes, deleteNote } =
    useContext(NotesContext);

  const [editingNote, setEditingNote] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  //  SAVE NOTE (with AI TAGS)
  const { createNote, updateNote } = useContext(NotesContext);

  const handleSave = async ({ title, content, _id }) => {
    if (!title.trim() || !content.trim()) {
      alert("Title & content required");
      return;
    }

    let tags = [];

    try {
      const tagRes = await API.post("/api/ai/tags", { content });
      tags = tagRes.data.tags || [];
    } catch {
      console.warn("AI tags failed");
    }

    try {
      if (_id) {
        await updateNote(_id, { title, content, tags });
      } else {
        await createNote({ title, content, tags });
      }

      setEditingNote(null);
    } catch (err) {
      console.error("SAVE ERROR ", err);
      alert("Failed to save");
    }
  };



  //  SEARCH FILTER
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome, {user?.name}
        </h1>

        {/* SEARCH */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {/* CREATE / EDIT */}
        <button
          onClick={() => setEditingNote({})}
          className="bg-black text-white px-4 py-2 rounded mb-4"
        >
          + New Note
        </button>

        {editingNote && (
          <NoteEditor
            initialData={editingNote}
            onSave={handleSave}
            onCancel={() => setEditingNote(null)}
          />
        )}

        {/* NOTES */}
        {filteredNotes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No notes found
          </p>
        ) : (
          <div className="columns-1 md:columns-2 gap-4 mt-4">
            {filteredNotes.map((note) => (
              <div key={note._id} className="mb-4 break-inside-avoid">
                <NoteCard
                  note={note}
                  onEdit={setEditingNote}
                  onDelete={deleteNote}
                />
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Dashboard;
