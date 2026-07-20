# 🎓 EduPulse – Intelligent Student Information System

> A full-stack, enterprise-inspired Student Information System (SIS) featuring role-based dashboards, QR attendance, AI-powered analytics, workflow automation, and modular architecture.

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 📌 Overview

EduPulse is a modern Student Information System built for higher educational institutions.

The system provides secure authentication, role-based access control, attendance management, academic tracking, fee management, AI-powered analytics, workflow automation, and parent engagement through five dedicated dashboards.

Unlike traditional college management systems, EduPulse follows a modular architecture where administrators can enable or disable complete modules without modifying the codebase.

---

# ✨ Features

## 👨‍🎓 Student Portal

* QR Attendance
* Timetable
* Assignment Submission
* Exam Results
* Attendance Analytics
* Leave Requests
* AI Study Assistant
* Notifications
* Discussion Forum
* Document Downloads

---

## 👨‍🏫 Faculty Portal

* Manage Classes
* Mark Attendance
* Generate QR Attendance
* Upload Assignments
* Grade Students
* Performance Analytics
* Student Communication
* AI Teaching Tools

---

## 🏫 HOD Portal

* Department Analytics
* Faculty Monitoring
* Attendance Trends
* Reports
* AI Insights
* Student Performance

---

## 🏛 Admin Portal

* Student Management
* Faculty Management
* Department Management
* Fee Management
* Placement Tracking
* Reports
* Module Management
* Security Logs
* Activity Monitoring

---

## 👨‍👩‍👧 Parent Portal

* Attendance
* Academic Progress
* Fee History
* Leave Status
* AI Chat Assistant

---

# 🚀 Key Highlights

* ✅ 5 Role-Based Dashboards
* ✅ 24 Database Models
* ✅ JWT Authentication
* ✅ Role-Based Access Control
* ✅ QR Attendance
* ✅ AI Analytics
* ✅ Workflow Engine
* ✅ Universal Search
* ✅ Command Palette (Ctrl+K)
* ✅ Smart Notifications
* ✅ Responsive UI
* ✅ Dark Mode
* ✅ Modular Architecture

---

# 🛠 Tech Stack

### Frontend

* React 18
* Tailwind CSS
* Context API
* React Router
* Axios

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis
* JWT
* bcrypt
* Zod

### DevOps

* Docker
* Docker Compose
* Git
* GitHub

---

# 🏗 Architecture

```text
React Frontend
      │
      ▼
REST API (Express)
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL + Redis
```

---

# 🔐 Authentication

* JWT Access Token
* Refresh Token
* Role-Based Access Control
* Password Hashing
* Rate Limiting
* Input Validation

---

# 📁 Project Structure

```text
edupulse
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── prisma
│   ├── src
│   ├── docker-compose.dev.yml
│   └── package.json
│
└── README.md
```

---

# ⚡ Installation

## Clone

```bash
git clone https://github.com/annantsharmaa/EduPulse.git

cd EduPulse
```

## Backend

```bash
cd backend

npm install

docker compose -f docker-compose.dev.yml up -d

npx prisma migrate dev

npx prisma db seed

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm start
```

---

# 🔑 Demo Accounts

| Role    | Email                                               | Password    |
| ------- | --------------------------------------------------- | ----------- |
| Admin   | [admin@edupulse.com](mailto:admin@edupulse.com)     | Admin@123   |
| Faculty | [faculty@edupulse.com](mailto:faculty@edupulse.com) | Faculty@123 |
| Student | [student@edupulse.com](mailto:student@edupulse.com) | Student@123 |
| HOD     | [hod@edupulse.com](mailto:hod@edupulse.com)         | HOD@123     |
| Parent  | [parent@edupulse.com](mailto:parent@edupulse.com)   | Parent@123  |

---

# 🚀 Future Improvements

* Real-time Notifications
* Mobile App
* Face Recognition Attendance
* Razorpay Integration
* WebSocket Support
* AI Chatbot using LLMs
* GitHub Actions CI/CD

---

# 👨‍💻 Author

**Annant Sharma**

B.Tech Computer Science Engineering
Noida International University

LinkedIn: https://www.linkedin.com/in/annantsharmaa/

GitHub: https://github.com/annantsharmaa

---
