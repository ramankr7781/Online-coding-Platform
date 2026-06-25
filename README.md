# LeetCode Clone with AI Assistant

A modern, full-stack coding platform inspired by LeetCode, featuring a built-in AI coding assistant and automated code reviewer powered by the Groq API (LLaMA 3). 

---

## 🚀 Features
- **Solve Coding Problems:** Execute code against hidden test cases using the Judge0 API.
- **AI Coding Assistant:** Get stuck? Chat with the AI assistant for hints and explanations without giving away the direct answer.
- **Automated Code Review:** Submit your code and receive instant, constructive feedback on time/space complexity, best practices, and edge cases.
- **Admin Dashboard:** Add and manage coding problems and solutions dynamically.
- **Dark Mode UI:** A beautiful, responsive interface built with React, Tailwind CSS, and DaisyUI.
- **Video Solutions:** Built-in video solution integration via Cloudinary.

---

## 💻 Comprehensive Tech Stack

### Frontend
- **React & Vite:** Fast, modern frontend framework and build tool.
- **Tailwind CSS & DaisyUI:** Utility-first CSS and pre-built responsive components for a sleek, dark-themed UI.
- **Monaco Editor:** The exact code editor that powers VS Code, integrated for a premium coding experience.
- **React-Markdown:** For rendering AI responses, complete with syntax highlighting and beautiful custom code blocks.
- **Redux Toolkit:** For state management (user authentication state).
- **React Router Dom:** Client-side routing.

### Backend
- **Node.js & Express.js:** Robust backend server to handle API requests and business logic.
- **MongoDB & Mongoose:** NoSQL database for flexible storage of problems, test cases, users, and submissions.
- **JWT (JSON Web Tokens):** Secure user authentication and authorization.
- **Cloudinary:** Used for uploading and streaming video solutions for problems.

### External APIs
- **Judge0 API (via RapidAPI):** Executes user-submitted code in sandboxed environments across multiple languages (C++, Java, Python, JavaScript) and compares output against hidden test cases.
- **Groq API (LLaMA 3 70B Versatile):** Powers the AI Chatting and Code Review systems, delivering lightning-fast AI inferences for real-time tutoring.

---

## 📂 Project Structure

### Backend Directory (`/backend/src`)
```text
backend/src
├── index.js               # Entry point of the Express server
├── config/
│   ├── db.js              # MongoDB connection configuration
│   └── redis.js           # Redis configuration (if applicable)
├── controllers/
│   ├── reviewCode.js      # Handles AI code review logic (Groq API)
│   ├── solveDoubt.js      # Handles AI chat logic (Groq API)
│   ├── userAuthent.js     # User Registration and Login logic
│   ├── userProblem.js     # CRUD operations for problems and test cases
│   ├── userSubmission.js  # Handles code submission to Judge0
│   └── videoSection.js    # Cloudinary video upload logic
├── middleware/
│   ├── adminMiddleware.js # Protects admin-only routes
│   └── userMiddleware.js  # Protects authenticated user routes
├── models/
│   ├── problem.js         # Mongoose schema for Problems
│   ├── solutionVideo.js   # Mongoose schema for Video Solutions
│   ├── submission.js      # Mongoose schema for Code Submissions
│   └── user.js            # Mongoose schema for Users
├── routes/
│   ├── aiChatting.js      # Routes: /ai/chat, /ai/review
│   ├── problemCreator.js  # Routes: /admin/problems (CRUD)
│   ├── submit.js          # Routes: /submit (Code execution)
│   ├── userAuth.js        # Routes: /auth/login, /auth/signup
│   └── videoCreator.js    # Routes: /admin/video (Uploads)
└── utils/
    ├── problemUtility.js  # Helper functions for formatting/batching Judge0 payloads
    └── validator.js       # Input validation utilities
```

### Frontend Directory (`/frontend/src`)
```text
frontend/src
├── App.jsx                # Main App component & Route definitions
├── index.css              # Global styles and Tailwind configuration
├── main.jsx               # React DOM rendering entry point
├── components/
│   ├── AdminDelete.jsx    # Component to delete problems
│   ├── AdminPanel.jsx     # Main Admin dashboard component
│   ├── AdminUpload.jsx    # Form to create new problems & test cases
│   ├── AdminVideo.jsx     # Component to manage video uploads
│   ├── ChatAi.jsx         # Interactive AI Chat interface
│   ├── CodeReview.jsx     # AI Code Review display component
│   ├── Editorial.jsx      # Problem editorial/solution tab
│   ├── MarkdownRenderer.jsx # Custom renderer for AI markdown responses
│   └── SubmissionHistory.jsx# Displays past code submissions
├── pages/
│   ├── Admin.jsx          # Admin Route Wrapper
│   ├── Homepage.jsx       # Problem List / Dashboard
│   ├── Login.jsx          # User Login Page
│   ├── ProblemPage.jsx    # Core Coding Interface (Editor, Tabs, Execution)
│   └── Signup.jsx         # User Registration Page
├── store/
│   └── store.js           # Redux store configuration
└── utils/
    └── axiosClient.js     # Axios instance with base URL configuration
```

---

## 🔗 API Routes

### Authentication (`/auth`)
- `POST /auth/signup` - Register a new user.
- `POST /auth/login` - Authenticate a user and receive a JWT.

### Problems & Admin (`/admin/problems`)
- `GET /admin/problems` - Fetch all available problems.
- `GET /admin/problems/:id` - Fetch a specific problem's details.
- `POST /admin/problems` - (Admin) Create a new problem with test cases.
- `PUT /admin/problems/:id` - (Admin) Update an existing problem.
- `DELETE /admin/problems/:id` - (Admin) Delete a problem.

### Code Execution (`/submit`)
- `POST /submit` - Sends code and problem ID to Judge0 for execution and returns the verdict (Accepted, Wrong Answer, etc.).

### AI Assistant (`/ai`)
- `POST /ai/chat` - Sends conversation history to Groq (LLaMA 3) to act as a helpful coding tutor.
- `POST /ai/review` - Sends user code and problem context to Groq to generate a structured code review.

### Video Solutions (`/admin/video`)
- `POST /admin/video/upload` - (Admin) Upload a solution video to Cloudinary.
- `DELETE /admin/video/:id` - (Admin) Delete a video.

---

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

