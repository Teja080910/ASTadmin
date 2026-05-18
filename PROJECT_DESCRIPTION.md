# AST Admin — Arkha Sodhara Tech Administrative Dashboard

A full-stack administrative dashboard built for the **ARKHA SODHARA TECH (AST) Team** at **SRKR Engineering College, CSE Department**. This platform serves as a centralized management hub for running a college tech team's daily operations — from attendance tracking and bootcamp management to hackathon lifecycle orchestration.

---

## 🎯 Purpose

To streamline the administrative workflow of a student tech team by replacing manual processes with a unified digital platform. The system handles everything from daily attendance (with OTP and face recognition) to full hackathon management with real-time countdowns and round-based evaluation.

---

## ✨ Key Features

### 📋 Attendance Management
- Dual-track attendance for **Technology** and **Sadhana (Yoga)** sessions
- OTP-based verification via email (Resend API)
- Optional **face-recognition attendance** using `face-api.js` + webcam capture
- Streak tracking with visual charts (Chart.js)
- Year-wise filtering and student CRUD

### 🏕️ Bootcamp Management
- Structured training program with task assignment by day
- Multi-dimensional scoring (given marks, internal marks, activity marks)
- Material uploads — PDFs and images stored in MongoDB GridFS
- Student data upload via XLSX parsing
- Attendance marking and feedback collection

### 🏆 Hackathon Management
- Full lifecycle management: problem statements → team registration → scoring
- Round-based evaluation with configurable tasks
- Real-time countdown timer via **Socket.IO**
- Photo gallery uploads
- Internal and activity marks tracking

### 🔐 AST Console (Admin Panel)
- Role-based access control: `superAdmin`, `admin`, `edit`, `org`
- Dynamic route management (add/edit/delete/toggle visibility)
- Admin account management with granular permissions
- Middleware-protected API routes

### 🚀 Project Showcase
- Students upload and display their projects
- Like/unlike and share via WhatsApp, Telegram, and Email
- Student login to manage own project listings

### 🤖 AI-Powered Chat
- PDF content analysis using **OctoAI (Llama 2)** model
- "Chat With Me" feature for document Q&A

### 🧑‍💼 Scrum Master Tools
- Daily attendance recording
- Daily work submission tracking

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Redux + redux-persist (cookie storage), Chakra UI, Material UI, React Bootstrap, Tailwind CSS, Framer Motion, Formik, Chart.js, react-webcam |
| **Backend** | Node.js, Express (ES Modules), MongoDB (native driver + GridFS), Mongoose |
| **Real-time** | Socket.IO (hackathon countdown timer) |
| **AI/ML** | face-api.js (face recognition), OctoAI SDK (Llama 2 for PDF chat) |
| **Auth & Security** | AES encryption (crypto-js), express-session, role-based middleware |
| **File Storage** | MongoDB GridFS (uploads bucket in VedicVision database) |
| **File Upload** | Multer, XLSX parsing |
| **Notifications** | Resend (email OTP), Twilio (SMS), SMTP.js |
| **Deployment** | Vercel (serverless-ready with vercel.json) |

---

## 🏗️ Architecture

**Monorepo structure:**
```
ASTadmin/
├── client/          # React SPA (Create React App, Webpack)
│   └── src/
│       ├── collection/    # Feature modules (attendance, face, project, etc.)
│       ├── ast-console/   # Admin panel module
│       ├── bootcamp/      # Bootcamp module
│       ├── hackathon/     # Hackathon module
│       └── actions/       # API helpers, auth, Redux store
├── server/          # Express API (ES Modules)
│   └── src/
│       ├── attendance/    # Attendance routes + OTP logic
│       ├── bootcamp/      # Bootcamp CRUD + scoring
│       ├── hackathon/     # Hackathon lifecycle
│       ├── ast-console/   # Console admin + middleware
│       └── multer/        # Upload config
```

**Key architectural decisions:**
- **Two MongoDB databases**: `Mern_Attendance` (primary data) and `VedicVision` (GridFS file storage)
- **Cookie-persisted Redux state** with 12-hour expiration via `redux-persist-cookie-storage`
- **URL query parameter navigation** (`?page=attendance`) for sub-page routing within modules
- **Conditional route rendering** — routes appear only after authentication checks complete
- **Mixed UI library usage** — evolved organically, leveraging Chakra UI modals/toasts, MUI Data Grid, Bootstrap navbar, and Tailwind utilities side by side

---

## 🔐 Authentication & Security

- Admin credentials AES-encrypted in sessionStorage
- Role-based access enforced via Express middleware (`ConsoleMiddleware`, `BootcamEditMiddlware`)
- Origin-check middleware restricts API access to approved domains
- Student login via register number + OTP

---

## 📦 External Integrations

- **OctoAI** — LLM-powered PDF chat
- **Resend** — Transactional email for OTP delivery
- **Twilio** — SMS notifications
- **Socket.IO** — Real-time hackathon timer (external server)
- **face-api.js** — Browser-based face detection and recognition

---

> **Role:** Full-stack Developer  
> **Timeline:** [Add your timeline here]  
> **Live Demo:** [Add URL if deployed]  
> **Repository:** Private/Internal
