# LeetCode Clone with AI Assistant

A modern, full-stack coding platform inspired by LeetCode, featuring a built-in AI coding assistant and automated code reviewer powered by the Groq API (LLaMA 3). 

## 🚀 Features
- **Solve Coding Problems:** Execute code against hidden test cases using the Judge0 API.
- **AI Coding Assistant:** Get stuck? Chat with the AI assistant for hints and explanations without giving away the direct answer.
- **Automated Code Review:** Submit your code and receive instant, constructive feedback on time/space complexity, best practices, and edge cases.
- **Admin Dashboard:** Add and manage coding problems dynamically.
- **Dark Mode UI:** A beautiful, responsive interface built with React, Tailwind CSS, and DaisyUI.

## 💻 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, React-Markdown (for formatting AI responses)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Code Execution:** Judge0 API
- **AI Integration:** Groq API (LLaMA 3 70B Versatile)

## 🛠️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/ramankr7781/Online-coding-Platform.git
cd Online-coding-Platform
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables. **(Do not share your actual keys publicly)**:
```env
PORT=3000
DB_CONNECT_STRING=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
REDIS_PASS=your_redis_password
JUDGE0_KEY=your_judge0_api_key
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed for API URLs, e.g., `VITE_BACKEND_URL=http://localhost:3000`).

Start the frontend development server:
```bash
npm run dev
```

## 🔐 Security Note
This repository does not contain any secret API keys or database credentials. Always ensure your `.env` files are included in your `.gitignore` to prevent leaking sensitive information.
