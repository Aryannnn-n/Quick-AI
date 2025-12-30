# ⚡ Quick AI

**Quick AI** is a modern **full-stack AI-powered content creation platform** that enables users to generate high-quality written content, create AI images, perform image editing, and receive AI-driven resume feedback — all secured with authentication and **usage-based plan enforcement**.


---

## 🌟 What Quick AI Does

* ✍️ Generate AI articles & blog titles
* 🖼 Generate AI images (**premium feature**)
* 🎭 Remove image backgrounds & unwanted objects
* 📄 Resume review (PDF → structured AI feedback)
* ❤️ Publish creations & like community posts
* 🔐 Secure authentication with plan-based access control
* 📊 Track user activity, usage limits, and publishing state
* 🌓 Light & Dark Mode (Persisted)

----

## 🧱 Tech Stack Overview

### 🎨 Frontend

* **React 19** + **Vite**
* **Tailwind CSS**
* **Clerk Authentication** (with `@clerk/themes`)
* **Context API** (Theme Management)
* Axios
* React Router
* Markdown rendering

### ⚙️ Backend

* **Node.js** + **Express**
* **PostgreSQL (Neon Serverless)**
* Clerk (JWT verification + user metadata)
* **Gemini AI** (text generation)
* **ClipDrop** (image generation & editing)
* **Cloudinary** (image storage & delivery)
* Multer & PDF-Parse (file uploads & resume parsing)

---

## 📂 Repository Structure

```
quick-ai/
│
├── frontend/          # React + Vite client
│   └── README.md      # Frontend documentation
│
├── backend/           # Express + PostgreSQL API
│   └── README.md      # Backend documentation
│
└── README.md          # Main project documentation (this file)
```

---

## 🔐 Authentication & Security

* Authentication handled entirely by **Clerk**
* JWT tokens securely passed from **frontend → backend**
* All AI and upload routes are **protected**
* **Plan-based enforcement**:

  * Free users → limited usage
  * Premium users → full access
* No secrets exposed in code
* All sensitive credentials stored in **environment variables**

---

## ⚙️ Local Setup (Recommended Order)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Aryannnn-n/Quick-AI.git
cd quick-ai
```



### 2️⃣ Backend Setup (Run First)

```bash
cd backend
npm install
npm run dev
```

Backend runs locally at:

```
http://localhost:3000
```

📄 **Complete backend configuration, API routes, environment variables, and database setup:**
➡️ **[Go to Backend README →](./backend/README.md)**



### 3️⃣ Frontend Setup (After Backend)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs locally at:

```
http://localhost:5173
```

📄 **Complete frontend configuration, Clerk setup, routing, and UI details:**
➡️ **[Go to Frontend README →](./frontend/README.md)**

---

## 🔁 System Flow (Simplified)

```
User (Browser)
   ↓
Frontend (React + Clerk)
   ↓ JWT
Backend (Express APIs)
   ↓
PostgreSQL (Neon Serverless)
   ↓
AI Services (Gemini / ClipDrop)
   ↓
Cloudinary (Images)
```

---

## 🌐 API Documentation

📖 **Backend API Reference:**
➡️ **[View Backend API Documentation →](./backend/README.md)**

The backend exposes **secure, authenticated REST APIs** for:

* AI text & image generation
* File uploads & resume parsing
* User content publishing
* Likes & community interactions

This documentation is useful for:

* Frontend integration
* Future mobile or third-party clients

📄 **Redirects to:** `backend/README.md`

---

## 🗄 Database Overview

**Database:** PostgreSQL (Neon Serverless)

Primary table: `creations`

Stores:

* AI articles
* Blog titles
* Generated images
* Resume reviews
* Likes count
* Publish visibility status
* User ownership metadata

📄 **Full schema and query details:**
➡️ **[See Database Schema →](./backend/README.md)**

---

## 🧪 Error Handling & Stability

* AI rate-limit handling (HTTP 429)
* Graceful fallbacks for AI service failures
* File upload size validation
* Centralized and consistent API response structure
* Safe handling of malformed PDFs and invalid inputs

---

## 🚀 Deployment Strategy

### ✅ Production Deployment (Current)

* **Frontend:** Vercel
* **Backend:** Vercel (Serverless Functions)
* **Database:** Neon Serverless PostgreSQL

### 🔁 Deployment Order

1. Deploy **Backend** to Vercel
2. Configure backend environment variables
3. Deploy **Frontend** to Vercel
4. Update **Clerk allowed domains**
5. Set `VITE_BASE_URL` to deployed backend URL

📄 **Deployment steps & environment variables:**
➡️ **[Backend Deployment Guide →](./backend/README.md)**
➡️ **[Frontend Deployment Guide →](./frontend/README.md)**

---

## 📈 Scalability & Future Enhancements

* Stripe payment gateway integration
* Admin moderation dashboard
* Advanced usage analytics
* AI response caching
* Multiple AI model switching support

---

## 🤝 Contributing

Contributions are welcome and appreciated!

* Fork the repository
* Create a feature branch
* Commit your changes
* Submit a pull request
* Open issues for bugs or enhancements

📄 **Contribution & project structure details:**
➡️ **[Read Backend Docs →](./backend/README.md)**
➡️ **[Read Frontend Docs →](./frontend/README.md)**

---

<div align="center">

## 👨‍💻 Author
**Aryan Chavan**
Full-Stack Developer
📧 [chavanaryan58@gmail.com](mailto:chavanaryan58@gmail.com)


⚡ **Quick AI** — Build smarter content, faster.
Designed with clean architecture, scalability, and production-ready best practices.

</div>

