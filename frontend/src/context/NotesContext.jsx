// src/context/NotesContext.jsx
import React, { createContext, useState } from "react";
import API from "../services/api";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await API.get("/api/notes/get");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch notes");
    }
  };

  // Create new note
  const createNote = async (note) => {
    try {
      const res = await API.post("/api/notes/create", note);
      setNotes((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    }
  };

  // Update existing note
  const updateNote = async (id, note) => {
    try {
      const res = await API.put(`/api/notes/${id}`, note);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } catch (err) {
      console.error(err);
      alert("Failed to update note");
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await API.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, fetchNotes, createNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
