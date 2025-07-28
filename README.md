# ExposureMania

ExposureMania is a full-stack social media application featuring user authentication, real-time chat, image sharing, and social networking features. The project is divided into two main parts:
- **Frontend**: Built with React, Vite, Tailwind CSS, and Bootstrap.
- **Backend**: Built with Node.js, Express, MongoDB (via Mongoose), and Socket.io for real-time features.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)

---

## Features
- User authentication (signup, login, logout)
- User profiles and profile editing
- Create, edit, and delete posts (with image upload)
- Like, dislike, and comment on posts
- Follow/unfollow users
- View user feeds, friends, and projects
- Real-time chat between users
- Responsive UI with modern design

---

## Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Socket.io Client](https://socket.io/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Socket.io](https://socket.io/)
- [Cloudinary](https://cloudinary.com/) (for image uploads)
- [JWT](https://jwt.io/) for authentication
- [Multer](https://github.com/expressjs/multer) for file uploads

---

## Project Structure

```
ExposureMania/
├── Frontend/
│   ├── src/
│   │   ├── components/         # React components (Login, Signup, Feed, Profile, etc.)
│   │   ├── context/            # React context for state management
│   │   ├── constant/           # Constants used in the app
│   │   ├── assets/             # Static assets (images, etc.)
│   │   ├── App.jsx             # Main app and routing
│   │   └── main.jsx            # Entry point
│   └── ...
├── Backend/
│   ├── src/
│   │   ├── controllers/        # Route controllers (auth, post, message)
│   │   ├── db/                 # Database connection
│   │   ├── middlewares/        # Auth, file upload, etc.
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # API routes
│   │   └── utils/              # Socket setup, helpers
│   ├── index.js                # Backend entry point
│   └── ...
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository
```bash
git clone <repo-url>
cd ExposureMania
```

### 2. Setup Backend
```bash
cd Backend
npm install
# Create a .env file with your environment variables (see below)
npm start
```

**.env example:**
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

### 3. Setup Frontend
```bash
cd ../Frontend
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## API Endpoints (Backend)

- `POST   /api/signup` — Register a new user
- `POST   /api/login` — Login
- `POST   /api/logout` — Logout (auth required)
- `POST   /api/posts` — Create a post (auth, file upload)
- `GET    /api/getposts` — Get all posts (auth)
- `GET    /api/getuser` — Get current user info (auth)
- `GET    /api/getAllUser` — Get all users (auth)
- `POST   /api/comment/:id` — Add comment to post (auth)
- `GET    /api/getcomments/:id` — Get comments for post (auth)
- `GET    /api/like/:id` — Like a post (auth)
- `GET    /api/dislike/:id` — Dislike a post (auth)
- `POST   /api/following/:followingId` — Follow a user (auth)
- `GET    /api/unfollow/:followingId` — Unfollow a user (auth)
- `GET    /api/getUserProfile/:username` — Get user profile (auth)
- `PATCH  /api/editprofile` — Edit user profile (auth)
- `PATCH  /api/uploadprofileimage` — Update profile image (auth, file upload)
- `PATCH  /api/updatecoverimage` — Update cover image (auth, file upload)
- `POST   /api/sendmessage/:id` — Send message (auth)
- `GET    /api/getmessages/:id` — Get messages (auth)

---

 
