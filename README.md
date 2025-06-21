# 🎬 Full-Stack Movie Recommendation App

A modern full-stack movie discovery and recommendation platform built with **React (Vite)** and **Node.js/Express**, using **PostgreSQL** (via Prisma) for persistent storage. Users can register, browse trending movies via TMDB, save favorites, and access custom experiences. Admins have a dedicated analytics dashboard. Clean UI, secure authentication, and real-time data make it both usable and scalable.

---

## 🚀 Live Deployment

- 🔗 Frontend: [movie-recommendation-app.vercel.app](https://movie-recommendation-app.vercel.app)
- 🔗 Backend: [Render](https://movie-recommendation-app-api.onrender.com)
- 🛠️ CI/CD: GitHub Actions + Codecov

---

## 🧱 Project Structure

Movie_Recommendation_App/ ├── movie-frontend/            # Vite + React + Tailwind CSS │   ├── src/ │   │   ├── components/ │   │   ├── pages/ │   │   ├── routes/ │   │   ├── services/ │   │   └── utils/ │   ├── public/ │   └── vite.config.js

├── movie-backend/             # Node.js + Express + PostgreSQL (Prisma) │   ├── config/ │   ├── controllers/ │   ├── middleware/ │   ├── models/ (if not using Prisma) │   ├── routes/ │   ├── prisma/ │   └── server.js

---
## 🧠 Recommendation Engine

We use a basic **content-based filtering** approach:
- Each user's favorite movies are analyzed for genres.
- The system recommends movies with overlapping genres.
- Future versions will support collaborative filtering and ML models.

### 🔗 Endpoint: `/recommend`

**GET /recommend**

Returns personalized recommendations based on user favorites.

**Headers:**
`Authorization: Bearer <JWT>`

**Response:**
```json
[
  {
    "id": 12,
    "title": "Inception",
    "genres": "Action,Sci-Fi,Thriller",
    ...
  }
]

## ✨ Core Features

### 🎥 Movie Discovery
- Integrated with **TMDB API**
- Search, trending, and detailed movie views

### 👤 User Experience
- Register/login with **JWT authentication**
- Secure password hashing with bcrypt
- Save and manage **favorite movies**
- Edit profile and settings

### 🛡️ Admin Panel
- Admin-only dashboard with activity logs and usage analytics
- Role-based access control (`user`, `admin`)
- Analytics endpoints for engagement and content tracking

---

## ⚙️ Tech Stack Overview

| Layer       | Stack                                    |
|-------------|------------------------------------------|
| Frontend    | React, Vite, Tailwind CSS, Axios         |
| Backend     | Node.js, Express, Prisma ORM             |
| Database    | PostgreSQL                               |
| Auth        | JWT, Bcrypt                              |
| CI/CD       | GitHub Actions, Codecov                  |
| API         | [TMDB API](https://www.themoviedb.org/)  |
| Hosting     | Vercel (Frontend), Render/Railway (API)  |

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Oracle69digitalmarketing/Movie_Recommendation_App.git
cd Movie_Recommendation_App

2. Setup Environment Variables

movie-backend/.env

PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/moviedb
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_key

movie-frontend/.env

VITE_API_BASE_URL=http://localhost:5000/api

3. Install Dependencies

# Backend
cd movie-backend
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend
cd ../movie-frontend
npm install
npm run dev


---

🌐 Key API Routes

Method	Route	Description

POST	/api/auth/register	Create a new user
POST	/api/auth/login	Authenticate user
GET	/api/movies	Fetch movies from TMDB
POST	/api/favorites	Save a movie to favorites
GET	/api/favorites	Get user's favorite movies
GET	/api/admin/analytics	Admin-only usage stats



---

🔐 Authentication & Security

JWT stored in localStorage

Role-based route protection using custom PrivateRoute

Backend guards protect /admin/* endpoints

Passwords hashed using bcrypt



---

📊 Admin Dashboard

Accessible only by authenticated users with the admin role. Displays:

User activity logs

Movie engagement stats

Top watched or favorited content



---

🧪 Testing & CI

Unit tests with Jest + Supertest

GitHub Actions for CI

Code coverage reporting via Codecov


npm test


---

📬 API Collections (Postman)

🔧 Full API Collection

Includes all endpoints for user, movie, favorites, and admin.

📥 Download Collection

🔐 Admin API Collection

Secure, role-protected routes for analytics and audit logs.

📥 Download Admin Collection

To import:

1. Open Postman → Import


2. Select .json file


3. Run against http://localhost:5000




---

📈 Deployment Stack

Service	Usage

Vercel	Frontend (auto-deploy on push)
Render/Railway	Backend API
Supabase	PostgreSQL hosting (optional)
GitHub Actions	CI/CD pipeline
Codecov	Test coverage reports



---

🧭 Future Enhancements

⭐ User ratings and reviews

📑 Watchlists & collections

🔁 OAuth with Google/GitHub

🔐 Email/password reset

🧵 Real-time logs & notifications

📦 Docker support + CI/CD pipelines



---

🧪 Checklist (MVP Readiness)

Feature	Status

TMDB Movie Search	✅
Favorites System	✅
JWT Auth	✅
Admin Analytics	✅
PostgreSQL Integration	✅
Role-Based Route Protection	✅
Clean UI (Tailwind)	✅
Full Deployment	🔲



---

📄 License

MIT — Feel free to use, modify, and share.


---

📸 Architecture Overview


