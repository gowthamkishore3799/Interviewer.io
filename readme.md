# 🎙️ interviewer.io

AI-powered interview platform where candidates participate in real-time voice interviews conducted by an intelligent agent. Recruiters receive structured evaluations, ATS-matched profiles, and detailed feedback — streamlining hiring with scale and precision.

> 🚀 Inspired by Mercor, enhanced with live voice detection and end-to-end automation.

---

## ✨ Features

- 🤖 AI-conducted interviews using OpenAI and useMicVAD
- 🎙️ Real-time voice detection & audio transcription
- 📄 ATS-style resume parsing and score matching
- 📊 Recruiter dashboard for application and interview review
- 🧾 Job creation, application, and tracking system
- 🔐 Secure authentication using JWT + Redis sessions
- ⚡ Built with full-stack TypeScript and modern tooling

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- React Router (SPA navigation)
- Ant Design (UI components)
- useMicVAD (real-time voice activity detection)
- OpenAI API integration

### 🔸 Backend
- Node.js + Express + TypeScript
- MongoDB (Mongoose)
- Redis (for session management)
- JWT authentication
- REST API design

---

## 📂 Project Structure

interviewer.io/
├── backend/ # Node.js API with Express, Redis, MongoDB
│ └── src/
│ ├── routes/ # Jobs, SSO
│ ├── models/ # Mongoose models
│ ├── services/ # Business logic
│ └── database/ # MongoDB setup
└── frontend/ # React + Vite SPA
└── src/
├── pages/ # Route views
├── components/ # UI components
├── context/ # Auth & loading contexts
└── api/ # API calls (jobs, auth)


---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/gowthamkishore3799/interviewer.io.git
cd interviewer.io

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install


3. Environment Variables
Create a .env file in both backend/ and frontend/.

Sample: sample-backend.env



4. Run the application
Start backend server
cd backend
npm run dev

Start frontend server
cd /frontend
npm run dev
```

## Demo

Watch the demo here: [Click to watch the video](https://www.loom.com/share/your-loom-video-id)


WIP => Docker Image build


🛡️ License
MIT © Gowtham Kishore




📬 Contact
For feedback, ideas, or collaboration:
📧 gowthamkishore0307@gmail.com
🐙 @gowthamkishore3799

