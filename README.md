# 🎬 Full-Stack Movie Discovery App

A modern movie discovery and recommendation platform built with **React (Vite)** and **Node.js/Express**, using **PostgreSQL** for persistent data storage. Users can register, log in, browse and favorite movies (fetched from TMDB), and admins can view usage analytics.

---

## 📁 Project Structure

movie-app/ ├── movie-frontend/         # Vite + React + Tailwind CSS │   ├── src/ │   │   ├── components/ │   │   ├── pages/ │   │   ├── routes/ │   │   ├── services/ │   │   └── utils/ │   └── vite.config.js ├── movie-backend/          # Node.js + Express + PostgreSQL │   ├── config/ │   ├── controllers/ │   ├── middleware/ │   ├── models/ │   ├── routes/ │   └── server.js

---

## 🚀 Features

### 👀 Movie Discovery
- TMDB integration for trending, popular, and searched movies
- Search and detailed view pages

### 👤 User-Centered
- Secure registration and login (JWT-based)
- Profile and settings pages
- Save favorites and view them later

### 🔐 Admin
- Protected admin-only dashboard
- Activity logs showing user actions and routes

---

## ⚙️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, JWT, bcrypt
- **Database**: PostgreSQL (via pg or Prisma)
- **External API**: [TMDB API](https://www.themoviedb.org/)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app

2. Setup Environment Variables

movie-backend/.env

PORT=5000
DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/moviedb
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_key

movie-frontend/.env

VITE_API_BASE_URL=http://localhost:5000/api


---

🔧 Local Setup

Backend

cd movie-backend
npm install
# If using Prisma:
npx prisma migrate dev --name init
npm run dev

Frontend

cd movie-frontend
npm install
npm run dev


---

🌐 Key API Routes (Backend)

POST /api/auth/register → Create user

POST /api/auth/login → Authenticate user

GET /api/movies → Fetch movies from TMDB

POST /api/favorites → Save favorite movie

GET /api/favorites → Retrieve user's favorites

GET /api/admin/analytics → Admin-only route for activity logs



---

🛡️ Authentication

JWT tokens stored in localStorage

Protected routes using custom PrivateRoute component

Role-based access control for /admin/*



---

🚀 Deployment

Frontend: Vercel or Netlify

Backend: Render or Railway

Database: Hosted PostgreSQL (e.g., Supabase, ElephantSQL)



---

🔍 Evaluation-Ready Checklist

Feature	Status

Movie Search + Details	✅
TMDB API Integration	✅
Favorites System	✅
JWT Auth	✅
Admin Analytics Route	✅
PostgreSQL Database	✅
Role-based Route Protection	✅
Clean UI + Tailwind Styling	✅
Backend File Structure	✅
Deployment Ready	🔲 Optional



---

🧪 Future Enhancements

User reviews and star ratings

Personalized watchlists

Email/password reset flow

OAuth login with Google

Deployment & CI/CD pipelines



---
[![codecov](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPO/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/YOUR_REPO)

📄 License

MIT


