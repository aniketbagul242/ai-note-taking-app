import Note from "../models/noteModel.js";


export const createNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const note = await Note.create({
            userId: req.userId,
            title,
            content,
            tags
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteNote = async (req, res) => {
    try {
        await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


