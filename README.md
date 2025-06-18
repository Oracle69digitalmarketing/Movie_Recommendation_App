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
# 🎬 Movie Recommendation App

[![CI](https://github.com/Oracle69digitalmarketing/Movie_Recommendation_App/actions/workflows/test.yml/badge.svg)](https://github.com/Oracle69digitalmarketing/Movie_Recommendation_App/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Oracle69digitalmarketing/Movie_Recommendation_App/branch/main/graph/badge.svg)](https://codecov.io/gh/Oracle69digitalmarketing/Movie_Recommendation_App)
[![Vercel](https://vercel.badge/Oracle69digitalmarketing/Movie_Recommendation_App.svg)](https://movie-recommendation-app.vercel.app)

A full-stack movie recommendation app built with:

- 💻 **Frontend:** React + Vite + Tailwind  
- 🌐 **Backend:** Express + Prisma + PostgreSQL  
- 🔐 JWT Auth, Role-Based Access Control (RBAC)  
- ⭐ Favorites, Watchlist, Reviews  
- 🧪 Unit Testing + CI/CD (Jest, GitHub Actions)  
- 📊 Code Coverage (Codecov)  
- 🚀 Live Demo: [movie-recommendation-app.vercel.app](https://movie-recommendation-app.vercel.app)

---

## 📦 Tech Stack

| Layer      | Stack                                |
|------------|--------------------------------------|
| Frontend   | React, Vite, Tailwind CSS            |
| Backend    | Node.js, Express, Prisma, PostgreSQL |
| Auth       | JWT + Bcrypt                         |
| Testing    | Jest, Supertest                      |
| CI/CD      | GitHub Actions + Codecov             |
| Hosting    | Vercel / Railway / Render            |

📄 License

MIT

🧭 Documentation & Assets

### 🖼️ System Architecture

A high-level overview of the full-stack architecture used in the Movie Recommendation App:

![Architecture Diagram](https://raw.githubusercontent.com/Oracle69digitalmarketing/Movie_Recommendation_App/main/assets/architecture.png)

📬 Postman Collections

Use these collections to test the API locally or during demo presentations:

🗂️ Full API Collection

Covers all routes across user, auth, movie discovery, favorites, reviews, watchlist, and admin analytics.

📥 Download Full API Collection

🔐 Admin Analytics Collection

Includes only the secure, role-based admin endpoints for stats, reviews, and top movie reports.

📥 Download Admin Analytics Collection

To use in Postman:

1. Open Postman
2. Click "Import"
3. Select the .json file from /postman/
4. Run requests locally against http://localhost:5000


