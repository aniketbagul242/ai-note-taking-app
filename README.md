# AI Note-Taking App

**AI-powered note-taking application** with features like note summarization, content improvement, and automatic tagging.  
Built as a full-stack MERN application for a POC developer assignment.

---

## 📝 Project Overview

This project demonstrates **full-stack development skills** by creating a functional note-taking application with AI-powered features.  
Users can register, log in, manage notes, and enhance their notes using AI.

---

## 🔑 Core Features

### Authentication
- User registration and login  
- Protected routes  
- Simple user profile display  

### Notes Management
- Create, view, edit, and delete notes  
- Search notes by title  

### AI Features
- **AI Summary:** Generate summaries for long notes  
- **AI Improve:** Improve note content (grammar, clarity)  
- **AI Tags:** Auto-generate relevant tags for notes  

### User Interface
- Clean and responsive interface  
- Dark/light theme toggle  

---

## 💻 Tech Stack

- **Frontend:**Javascript, React.js, Tailwind CSS, React Hook Form  
- **Backend:** Node.js, Express.js, Mongoose (MongoDB)  
- **Database:** MongoDB   
- **AI Integration:** Cohere API, Hugging Face API: 
- **Authentication:** JWT-based authentication  

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ai-note-taking-app.git
cd ai-note-taking-app

2. Setup Backend
cd backend
npm install

Create a .env file in the backend folder with the following variables

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COHERE_API_KEY=your_openai_api_key
HF_ACCESS_TOKEN="your"
PORT="your"

Start the backend server:
npm start

3. Setup Frontend
cd ../frontend
npm install
npm start
