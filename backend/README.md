# ⚡ Quick AI — Backend Service



This repository contains the **backend service** for an AI-powered content creation platform. It provides secure APIs for **text generation, image generation, resume review, and content management**, using **Gemini AI**, **ClipDrop**, **Cloudinary**, **PostgreSQL (Neon)**, and **Clerk authentication**.


---

## 🚀 Features

* ✍️ AI-generated articles & blog titles
* 🖼️ AI image generation (premium)
* 🧠 Resume review using PDF analysis
* 🎨 Image background & object removal
* 🔐 Secure authentication with Clerk
* 📊 Free vs Premium usage enforcement
* ❤️ Public publishing & likes system
* ☁️ Cloudinary-powered image storage
* 🗄 PostgreSQL (Neon) serverless database


---

## 🛠 Tech Stack

* **Node.js + Express**
* **PostgreSQL (Neon Serverless)**
* **Clerk** – Authentication & User Management
* **Google Gemini API** – Text generation
* **ClipDrop API** – Image generation
* **Cloudinary** – Image processing & storage
* **Multer** – File uploads
* **PDF-Parse** – Resume text extraction

---

## 📁 Project Structure

```
backend/
│
├── configs/
│   ├── cloudinary.js
│   ├── dbConfig.js
│   └── multerConfig.js
│
├── controllers/
│   ├── ai.controller.js
│   └── user.controller.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── routes/
│   ├── ai.routes.js
│   └── user.routes.js
│
├── .env.example
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file using the following template:

```env
PORT=3000
DATABASE_URL=

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

GEMINI_API_KEY=
CLIPDROP_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🚀 Backend Setup & Installation

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

Server will start on:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

* Authentication is handled using **Clerk**
* `clerkMiddleware()` is applied globally
* `requireAuth()` ensures **only logged-in users** can access APIs
* User metadata (`plan`, `free_usage`) is used to enforce **free vs premium logic**

---

## 🗄 Database Schema (PostgreSQL)

### `creations` table

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🤖 AI Routes (`/api/ai`)

All routes are **protected** and require authentication.

---

### 🔹 Generate Article

**POST** `/api/ai/generate-article`

**Description:**
Generates a long-form article using Gemini AI.

**Request Body**

```json
{
  "prompt": "Write an article on AI",
  "length": 800
}
```

**Logic**

* Free users: max **10 requests**
* Token size auto-adjusted based on length
* Result saved in DB as `type = article`

---

### 🔹 Generate Blog Titles

**POST** `/api/ai/generate-blog-titles`

**Description:**
Generates blog title ideas.

**Request Body**

```json
{
  "prompt": "AI in healthcare"
}
```

---

### 🔹 Generate Image (Premium Only)

**POST** `/api/ai/generate-image`

**Description:**
Generates AI images using ClipDrop API.

**Request Body**

```json
{
  "prompt": "A futuristic city",
  "publish": true
}
```

**Logic**

* Only available for **premium users**
* Image stored in Cloudinary
* URL saved in database

---

### 🔹 Remove Image Background

**POST** `/api/ai/remove-image-background`

**Form Data**

```
image: file
```

**Description:**
Removes image background using Cloudinary AI transformation.

---

### 🔹 Remove Object From Image

**POST** `/api/ai/remove-image-object`

**Form Data**

```
image: file
```

**Body**

```json
{
  "object": "person"
}
```

---

### 🔹 Resume Review (PDF)

**POST** `/api/ai/resume-review`

**Form Data**

```
resume: PDF file (max 5MB)
```

**Description**

* Extracts text from PDF
* Sends content to Gemini AI
* Returns structured resume feedback

---

## 👤 User Routes (`/api/user`)

---

### 🔹 Get User Creations

**GET** `/api/user/get-user-creations`

Returns all creations of the logged-in user.

---

### 🔹 Get Published Creations

**GET** `/api/user/get-published-creations`

Returns all publicly published creations.

---

### 🔹 Like / Unlike Creation

**POST** `/api/user/toggle-like-creations`

**Request Body**

```json
{
  "id": 12
}
```

**Logic**

* Toggles user ID in `likes[]` array
* Uses PostgreSQL array update

---

## 🧠 Business Logic Highlights

* **Plan-based access control** (free vs premium)
* **Free usage tracking** via Clerk private metadata
* **AI response trimming** to avoid incomplete text
* **Cloudinary transformations** for image editing
* **PostgreSQL array handling** for likes

---

## ❗ Error Handling

* Handles AI rate limits (`429`)
* Graceful fallback messages for AI downtime
* File size validation for uploads
* Centralized response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 📚 API References

* Gemini AI: [https://ai.google.dev/gemini-api/docs/openai](https://ai.google.dev/gemini-api/docs/openai)
* Neon + Express: [https://neon.com/docs/guides/express](https://neon.com/docs/guides/express)
* ClipDrop API: [https://clipdrop.co/apis/docs](https://clipdrop.co/apis/docs)
* Cloudinary: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)

---


<div align="center">

Built with passion by **Rn💫**  
Full-Stack Developer  
© 2025 — **Quick AI**

</div>


