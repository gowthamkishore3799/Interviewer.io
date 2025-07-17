# 🧠 interviewer.io – Frontend

This is the frontend for **interviewer.io**, an AI-powered interview platform where candidates engage in real-time voice interviews with an intelligent agent. Built with **React**, **TypeScript**, and **Vite**, this SPA provides a seamless experience for both candidates and recruiters.

---

## ✨ Key Features

- 🎙️ Real-time voice-based interviews using **useMicVAD**
- 🗂️ Job listings, applications, and candidate flow UI
- 🔐 Secure login/signup with session tracking via `sessionStorage`
- 🔄 SPA navigation using **React Router**
- 💠 Elegant UI built with **Ant Design** and **Tailwind CSS**
- 🧱 Modular components and robust error handling
- 🔌 API integration with backend for jobs, applications, and auth

---

## 🏗️ Tech Stack

- **React** + **TypeScript**
- **Vite** (blazing fast build tool)
- **Tailwind CSS** for styling
- **Ant Design** for components
- **React Router (v6+)** for routing
- **useMicVAD** for real-time voice activity detection
- **sessionStorage** for auth/session persistence
- REST API calls to backend (Node.js, not included in this repo)

🔀 Routing (SPA - Client Side)
This project is a CSR single-page application (SPA). Routing is handled entirely on the client by react-router-dom.