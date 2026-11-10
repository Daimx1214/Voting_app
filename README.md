# 🗳️ Voting App - Full Stack Online Voting System

A secure and modern **Full-Stack Online Voting Application** built using **Node.js, Express, MongoDB, React, Vite, and Tailwind CSS**. This application allows registered users to securely cast their vote for political or organizational candidates, view live voting statistics, and manage user profiles while providing an **Admin Panel** for managing candidates.

---

## 🚀 About This Project

The **Voting App** is designed to digitize and simplify voting workflows with high security and real-time tracking. It enforces strict voting integrity by allowing each registered voter (identified by their unique ID Card) to vote **only once**. Administrators have elevated privileges to add, update, or remove candidates, while admins themselves are restricted from casting votes to maintain neutrality.

---

## 🌟 Key Features

### 👤 Voter Features
* **Secure Registration & Authentication**: Users sign up with Name, Age, Email, Mobile, Address, and unique ID Card number.
* **One Vote Per User**: Prevents duplicate voting by tracking user voting status (`isVoted`).
* **Candidate List**: View candidate profiles, party affiliations, and party logos/images.
* **Profile Management**: View profile details and securely update password.
* **Live Results**: View real-time leaderboard showing live vote counts sorted in descending order.

### 🛡️ Admin Features
* **Admin Role Protection**: Only one super-admin account can exist in the system.
* **Candidate Management (CRUD)**: Add new candidates, update candidate info, or remove candidates.
* **Voting Neutrality**: Admins are strictly prohibited from casting votes.

### 🎨 User Interface
* Clean, modern UI built with **React** and **Tailwind CSS**.
* Interactive modals for Login/Signup and Legal terms.
* Sleek icons powered by **Lucide React**.

---

## 🛠️ Tech Stack & Concepts

### **Backend (Server & Database)**
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose ORM)
* **Security & Auth**: JWT (JSON Web Tokens), Bcrypt (Password Hashing)
* **Middleware**: CORS, Body-Parser, Express Static

### **Frontend (Client)**
* **Framework**: React 18
* **Build Tool**: Vite
* **Styling**: Tailwind CSS, PostCSS, Autoprefixer
* **Icons**: Lucide React

---

## 📁 Project Structure

```text
Voting_app/
├── db.js                     # MongoDB connection setup
├── jwt.js                    # JWT middleware & token generation
├── server.js                 # Express server & API routes entry point
├── seed_candidates.js        # Initial database seed script for candidates
├── seed_votes.js             # Seed script for generating sample votes
├── models/
│   ├── user.js               # User Schema (Role, ID Card, Voting Status)
│   └── candidate.js          # Candidate Schema (Party, Votes array, Vote Count)
├── routes/
│   ├── userRoutes.js         # Signup, Login, Profile & Password routes
│   └── candidateRoutes.js   # Candidate CRUD, Voting & Vote Count routes
└── frontend/
    ├── index.html            # Vite HTML template
    ├── package.json          # Frontend dependencies & scripts
    ├── tailwind.config.js    # Tailwind CSS configuration
    ├── vite.config.js        # Vite build setup
    └── src/
        ├── main.jsx          # React app entry point
        ├── App.jsx           # Root React component
        ├── api.js            # Axios/Fetch API requests wrapper
        ├── components/       # UI components (AdminPanel, AuthModal, CandidateCard, etc.)
        └── context/          # React Context (AuthContext)
```

---

## 🔌 API Endpoints Overview

### 🔑 User / Authentication Routes (`/user`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/user/signup` | Public | Register a new user/voter account |
| `POST` | `/user/login` | Public | Authenticate user & return JWT token |
| `GET` | `/user/profile` | Protected | Fetch logged-in user profile |
| `PUT` | `/user/profile/password` | Protected | Change account password |

### 🗳️ Candidate & Voting Routes (`/candidate`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/candidate` | Public | Fetch list of all candidates |
| `POST` | `/candidate` | Admin | Create a new candidate |
| `PUT` | `/candidate/:candidateId` | Admin | Update candidate details |
| `DELETE` | `/candidate/:candidateId` | Admin | Delete a candidate |
| `POST` | `/candidate/vote/:candidateId` | Voter | Cast a vote for a candidate |
| `GET` | `/candidate/vote/count` | Public | Get candidates sorted by total vote count |

---

## ⚙️ Getting Started & Installation

### Prerequisites
* **Node.js** (v16 or higher)
* **MongoDB** (Local MongoDB server running at `mongodb://localhost:27017` or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Daimx1214/Voting_app.git
cd Voting_app
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URL_LOCAL=mongodb://localhost:27017/voting
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Install & Run Backend Server
```bash
npm install
npm start
```
The server will run on `http://localhost:3000`.

### 4. Install & Run Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend will open on `http://localhost:5173`.

---

## 👨‍💻 Author

**Daim Ali**

BS Computer Science Student  
Focused on Full-Stack Development, Node.js, React, and .NET Development.

* GitHub: [@Daimx1214](https://github.com/Daimx1214)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

### ⭐ If you found this project helpful, consider giving it a star on GitHub!

## Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Daim_Ali-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/daimx1214/)
