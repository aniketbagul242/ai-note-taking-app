
import React, { useState } from "react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {note.title}
      </h3>

      <p
        className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap
        ${!expanded ? "line-clamp-3" : ""}`}
      >
        {note.content}
      </p>

      {note.content.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1.5 text-sm rounded-md text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
