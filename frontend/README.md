

# ⚡ Quick AI — Frontend Service

This repository contains the **frontend application** for an AI-powered content creation platform. It provides a modern, responsive UI for generating **articles, blog titles, AI images, background/object removal, resume review**, and browsing a **community feed**, powered by a secure backend.

---

## 🚀 Features

* 🔐 **Authentication with Clerk**
* ✍️ AI Article Generator
* 🏷 AI Blog Title Generator
* 🖼 AI Image Generator (Premium)
* 🎭 Image Background Removal
* ✂ Object Removal from Images
* 📄 Resume Review (PDF)
* ❤️ Like & Explore Community Creations
* 📊 User Dashboard with usage & plan info
* 🎨 Modern UI with Tailwind CSS

---

## 🛠 Tech Stack

* **React 19**
* **Vite**
* **React Router DOM**
* **Tailwind CSS**
* **Clerk Authentication**
* **Axios**
* **Lucide Icons**
* **React Hot Toast**
* **React Markdown**

---

## 📁 Project Structure

```
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── CreationItem.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── WriteArticle.jsx
│   │   ├── BlogTitles.jsx
│   │   ├── GenerateImages.jsx
│   │   ├── RemoveBackground.jsx
│   │   ├── RemoveObject.jsx
│   │   ├── ReviewResume.jsx
│   │   └── Community.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the root of `frontend/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BASE_URL=
```

* `VITE_BASE_URL` → Backend base URL
  Example:

  ```
  http://localhost:3000
  ```

---

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start development server

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔁 Routing Overview

```txt
/                     → Landing Page
/ai                   → Protected Layout
/ai                   → Dashboard
/ai/write-article     → Article Generator
/ai/blog-titles       → Blog Title Generator
/ai/generate-images   → Image Generator
/ai/remove-background → Background Removal
/ai/remove-object     → Object Removal
/ai/review-resume     → Resume Review
/ai/community         → Public Creations
```

All `/ai/*` routes are **protected** and require authentication.

---

## 🔐 Authentication Flow (Clerk)

* Uses **Clerk React SDK**
* Login / Signup handled via `<SignIn />`
* JWT token retrieved using `getToken()`
* Token passed in API calls:

```js
Authorization: `Bearer ${await getToken()}`
```

* `Protect` component used for **plan-based UI rendering**

---

## 🌐 API Integration

Axios is used for all backend communication.

### Base URL Setup

```js
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
```

### Example API Call

```js
await axios.post(
  '/api/ai/generate-article',
  { prompt, length },
  {
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  }
);
```

---

## 🧠 Key Pages & Logic

### 🧾 Dashboard

* Shows total creations
* Displays current plan (Free / Premium)
* Lists recent generated content

---

### ✍️ Article Generator

* Select article length
* Markdown-rendered output
* Free & premium usage handling

---

### 🏷 Blog Title Generator

* Category-based title generation
* Markdown rendering for results

---

### 🖼 Image Generator (Premium)

* Style-based image generation
* Option to publish image publicly
* Displays generated Cloudinary image

---

### 🎭 Background & Object Removal

* Uses file upload (multipart/form-data)
* Real-time image preview
* Premium-only features

---

### 📄 Resume Review

* PDF upload
* AI-based analysis
* Markdown-rendered feedback

---

### 🌍 Community Page

* Displays published creations
* Like / unlike images
* Real-time likes count

---

## 🎨 UI & Styling

* Built with **Tailwind CSS**
* Fully responsive
* Clean component-based layout
* Icons via **Lucide React**

---

## 🚨 Error Handling

* API errors handled with `react-hot-toast`
* Graceful loading states
* Backend messages shown directly to users

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request to help improve **Quick AI**.


---

## 🙌 Acknowledgements

Built with ❤️ using modern frontend technologies and AI-powered services.

---

### ⚡ Quick AI — Build smarter content, faster.
