import React, { useState } from "react";
import API from "../../services/api";


const AIButtons = ({ content, onUpdate }) => {
  const [loadingType, setLoadingType] = useState(null);

  const runAI = async (type) => {
    if (!content.trim()) return;

    try {
      setLoadingType(type);

      const res = await API.post(
        type === "summary" ? "/api/ai/summary" : "/api/ai/improve",
        { content }
      );

      console.log("AI RESPONSE ", res.data);

      if (type === "summary") {
        const summary = res.data.summary || content; // fallback
        onUpdate(summary);
      }

      if (type === "improve") {
        const improved = res.data.improvedText || content;
        onUpdate(improved);
      }
    } catch (err) {
      console.error("AI ERROR ", err.response?.data || err.message || err);
      alert(
        `AI ${type} failed: ${err.response?.data?.message || err.response?.statusText || err.message
        }`
      );
    } finally {
      setLoadingType(null);
    }
  };


  return (
    <div className="flex gap-2 mt-2">
      <button
        type="button"
        onClick={() => runAI("summary")}
        disabled={loadingType !== null}
        className={`px-4 py-2 rounded-lg font-semibold shadow text-white transition 
          ${loadingType === "summary" ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
      >
        {loadingType === "summary" ? "✨Summarizing..." : "✨AI Summary"}
      </button>

      <button
        type="button"
        onClick={() => runAI("improve")}
        disabled={loadingType !== null}
        className={`px-4 py-2 rounded-lg font-semibold shadow text-white transition 
          ${loadingType === "improve" ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loadingType === "improve" ? "✨Improving..." : "✨AI Improve"}
      </button>
    </div>
  );
};

export default AIButtons;
