import React, { useState, useEffect } from "react";
import AIButtons from "../AIButtons/AIButtons";


const NoteEditor = ({ initialData = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);


  //  Sync editor when editing different note
  useEffect(() => {
    setTitle(initialData.title || "");
    setContent(initialData.content || "");
  }, [initialData]);

  const handleSave = async () => {

    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    try {
      setIsSaving(true);

      await onSave({
        _id: initialData._id,
        title,
        content,
      });

    } finally {
      setIsSaving(false);
    }

  };

  return (
    <div className="border p-4 rounded shadow-md bg-white dark:bg-gray-800">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-900 
             text-gray-900 dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500
             p-2 rounded w-full mb-2 outline-none focus:ring-2 focus:ring-indigo-500"
      />


      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-900 
             text-gray-900 dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500
             p-2 rounded w-full h-32 mb-2 resize-none outline-none focus:ring-2 focus:ring-indigo-500"
      />


      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-1 rounded text-white transition
             ${isSaving
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>


          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

        </div>

        {content.trim() && (
          <AIButtons content={content} onUpdate={setContent} />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
