import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";


const COHERE_API_KEY = process.env.COHERE_API_KEY;
const HF_API_KEY = process.env.HF_ACCESS_TOKEN;


async function callHuggingFace({ model, input, parameters = {} }) {
    const response = await fetch(
        `https://router.huggingface.co/hf-inference/models/${model}`, // correct router
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: input,
                parameters,
            }),
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return response.json();
}

// 1️⃣ AI SUMMARY
export const summarizeNote = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const data = await callHuggingFace({
            model: "facebook/bart-large-cnn",
            input: content,
            parameters: {
                max_length: 60,
                min_length: 25,
            },
        });

        res.json({ summary: data[0]?.summary_text });
    } catch (error) {
        console.error("AI SUMMARY ERROR 👉", error.message);
        res.status(500).json({ message: "AI summary failed" });
    }
};

// 2️⃣ AI IMPROVE
export const improveNote = async (req, res) => {
    try {
        const { content } = req.body;

        const response = await fetch("https://api.cohere.com/v1/chat", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${COHERE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "command-a-03-2025",
                message: `Improve grammar and clarity of the following note:\n\n${content}`,
                temperature: 0.3,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: data });
        }

        res.json({
            improvedText: data.text,
        });

    } catch (error) {
        console.error("AI IMPROVE ERROR 👉", error);
        res.status(500).json({ error: "AI improvement failed" });
    }
};




// 3️⃣ AI TAGS
export const generateTags = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await fetch("https://api.cohere.com/v1/chat", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "command-a-03-2025",
                message: `
               Generate 3 to 5 short, relevant tags for the following note.
             Return ONLY comma-separated tags. No explanation.Note:${content}`,
                temperature: 0.3,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Cohere error:", data);
            return res.status(500).json({ error: data });
        }

        const tagsText = data.text || "";
        const tags = tagsText
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);

        res.json({ tags });

    } catch (error) {
        console.error("AI TAGS ERROR 👉", error);
        res.status(500).json({ message: "AI tag generation failed" });
    }
};
