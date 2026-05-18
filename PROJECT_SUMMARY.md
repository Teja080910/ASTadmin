## AST Admin — Arkha Sodhara Tech Administrative Dashboard

**What it is:** A full-stack administrative dashboard for a college student tech team (**ARKHA SODHARA TECH** at SRKR Engineering College, CSE Dept). It's a monorepo with a React frontend (`/client`) and Node.js/Express backend (`/server`).

**Core features:**
- **Attendance management** with OTP verification (tech + yoga sessions), streak tracking, and face-recognition-based attendance via `face-api.js`
- **Bootcamp management** — task assignment, scoring/grading, file uploads (PDFs/images), student data, attendance, feedback
- **Hackathon management** — problem statements, team registration, round-based evaluation, scoring, photo galleries, real-time countdown timer (Socket.IO)
- **AST Console** — internal admin panel with role-based access (superAdmin, admin, edit) for managing routes, admins, and system config
- **Project showcase** — students upload projects with like/share (WhatsApp, Telegram, Email)
- **Scrum master tools** — daily attendance and work submission tracking
- **AI chatbot** — OctoAI-powered PDF chat (Llama 2)

**Tech stack:** React 18, Redux + redux-persist (cookie storage), Chakra UI + MUI + Bootstrap + Tailwind (mixed), MongoDB with native driver + GridFS, Express, Socket.IO, face-api.js, Formik, Framer Motion, Chart.js, Multer, Nodemailer/Resend, Twilio.
