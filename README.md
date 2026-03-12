# AI Learning Coach

## 1) System Architecture

AI Learning Coach is a full-stack learning platform for a 90-day programming bootcamp.

- **Frontend (React + Vite)**
  - SPA with React Router pages: Dashboard, Lesson, Assignment, Progress, Weekly Challenge.
  - Axios service layer calls backend APIs.
  - Monaco Editor provides Python coding experience.
- **Backend (Node.js + Express)**
  - REST API for lessons, assignments, progress, and reflections.
  - Mongoose models persist users, progress, assignments, and reflections in MongoDB.
  - Gemini service generates lessons and evaluates Python submissions.
- **Database (MongoDB)**
  - Stores persistent progress and learning artifacts.
- **AI Layer (Google Gemini API)**
  - Dynamic lesson generation and code evaluation.
  - Includes fallback behavior if API key is unavailable.

## 2) Folder Structure

```text
root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── CodeEditor.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Lesson.jsx
│   │   │   ├── Assignment.jsx
│   │   │   ├── Progress.jsx
│   │   │   └── WeeklyChallenge.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   ├── lessonController.js
│   │   └── assignmentController.js
│   ├── routes/
│   │   ├── lessonRoutes.js
│   │   └── assignmentRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Progress.js
│   │   ├── Assignment.js
│   │   └── Reflection.js
│   ├── services/
│   │   └── geminiService.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

## 3) Installation Steps

### Prerequisites
- Node.js 18+
- MongoDB running locally (or cloud URI)
- Gemini API key

### Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env with your MONGO_URI and GEMINI_API_KEY
npm run start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## API Endpoints

- `GET /lesson/:day`
- `POST /assignment/submit`
- `GET /progress`
- `POST /reflection`
- `GET /dashboard`



## Troubleshooting


If backend start fails with `EADDRINUSE: address already in use :::5000`:

- Either stop the process using that port:
  - macOS/Linux: `lsof -i :5000` then `kill -9 <PID>`
- Or start on a different preferred port:
  - `PORT=5001 npm run start`

The backend automatically retries with the next free port when the preferred port is occupied.
By default it retries up to 15 additional ports (`PORT_RETRY_LIMIT=15`).
You can increase this range if needed:
- `PORT=5000 PORT_RETRY_LIMIT=30 npm run start`
