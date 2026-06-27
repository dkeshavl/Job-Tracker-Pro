# 🚀 Job Tracker Pro

A modern full-stack **Job Application Tracking System** built with **React.js, Node.js, Express.js, and MySQL** that helps job seekers organize, manage, and monitor their job applications in one place.

Whether you're applying to 10 jobs or 500, Job Tracker Pro keeps your job search organized with an interactive dashboard, Kanban board, interview scheduler, and application analytics.

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 📋 Add, Edit & Delete Job Applications
- 📊 Dashboard with Application Statistics
- 📌 Drag & Drop Kanban Board
- 🔍 Search Jobs by Company or Position
- 🎯 Filter & Sort Applications
- 💰 Salary Tracking
- 📅 Interview Date & Time Scheduling
- ⏳ Live Interview Countdown Timer
- 🗑️ Delete Account with Complete Data Removal
- 📱 Responsive UI
- 🔒 Protected Routes

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- UUID

### Database
- MySQL

---

## 📸 Screenshots

> Add screenshots here

- Dashboard
- Jobs Table
- Kanban Board
- Login
- Register
- Add Job

---

## 📂 Folder Structure

```
Job-Tracker-Pro
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── utils
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/dkeshavl/Job-Tracker-Pro.git
```

```bash
cd Job-Tracker-Pro
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_tracker

JWT_SECRET=your_secret_key
```

Start the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## REST API

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- DELETE `/api/auth/delete-account`

### Jobs

- GET `/api/jobs`
- POST `/api/jobs`
- PUT `/api/jobs/:id`
- DELETE `/api/jobs/:id`
- PUT `/api/jobs/:id/status`
- GET `/api/jobs/stats`

---

## Application Status

- Applied
- Interview
- Offer
- Rejected

---

## Highlights

- Full CRUD functionality
- Secure JWT authentication
- Drag & Drop Kanban Board
- Dashboard Analytics
- Live Interview Countdown
- Search, Filter & Sorting
- Responsive UI
- RESTful API
- MySQL Database
- Component-Based React Architecture

---

## Future Enhancements

- 📧 Email Interview Reminders
- 🤖 AI Resume Analyzer
- 🎯 AI Job Recommendations
- 📅 Google Calendar Integration
- 📈 Charts & Analytics
- 📂 Resume Upload
- 📄 Export to PDF/Excel
- 🔔 Notifications
- 🌙 Dark/Light Theme

---

If you found this project useful, consider giving it a ⭐ on GitHub!