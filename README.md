# 📸 FinalIg  

## Full-Stack Social Network Platform

FinalIg is a full-stack social media web application inspired by Instagram.  
The project demonstrates Instagram web using **Node.js, Express.js, MongoDB and Vanilla JavaScript**, combining backend and frontend development into a complete interactive social platform.

Users can register, log in, create posts, follow other users, watch and upload stories, like and comment on posts, send messages, and interact through messages.

The goal of the project was to build a **realistic full-stack social application** that demonstrates database design, REST APIs, authentication, media handling, and interactive frontend development.

---

# 👨‍💻 About the Developer

**Noam Cohen**  
hey,
I am a Computer Science Student at he College of Management in Rhishon LeZion

I am passionate about software development, full-stack systems, and building real interactive systems.  
This project was built as part of my academic studies in web application development' year I and demonstrates my ability to design and implement a complete web system.

---

# 🚀 Running the Project

Follow these steps to run the project locally.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/noamc24/Instagram-lookalike.git
cd FinalIg
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create an `.env` file in the project root

Add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finalig
JWT_SECRET=supersecretkey
```

⚠️ Important

This project **does NOT include the author's MongoDB credentials**.  
Anyone running the project must provide **their own MongoDB connection string**.

This ensures security and allows each developer to run the project with their own database.

### 4️⃣ Start the server

```bash
npm start
```

The application will run at:

```
http://localhost:3000
```

---

# 🌱 Demo Data

When the database is empty, the project automatically generates demo users, posts, and stories so the feed is populated.

our demo users are:
- noam_demo
- ron_demo
- itzik_demo
- unreal_news
- sultan_demo

---

# ✨ Features

## 🔐 Authentication
- User registration
- Login system
- Secure password hashing using **bcrypt**
- Authentication using **JWT (JSON Web Token)**

## 📰 Social Feed
- Create posts with images or videos
- Like posts
- Comment on posts
- Feed showing posts from followed users
- Dynamic content rendering

## 👤 User Profiles
- Personal profile pages
- Public profile viewing
- Followers and following system
- Profile pictures

## 📖 Stories
- Instagram-style stories
- Stories loaded dynamically from the database
- Ordered by creation time

## 💬 Messaging System
- Private conversations
- Persistent messages stored in the database
- Conversation management

## 👥 Groups
- Group creation
- Public and private groups
- Group messaging

## 📍 Additional Features
- Location support for posts
- Google Maps integration
- Statistics page
- External API integration
- Responsive design

---

# 🧠 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

### Frontend
- HTML5
- CSS3
- Bootstrap
- Vanilla JavaScript

### Database
- MongoDB Atlas

---

# 📂 Project Structure

FinalIg
│
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── uploads
│   └── app.js
│
├── frontend
│   ├── html
│   ├── css
│   ├── js
│   └── assets
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---


# 🔮 Possible future Improvements

- Real-time messaging using WebSockets
- Notification system
- Cloud media storage (Cloudinary / AWS)
- Mobile-first UI improvements
- Advanced moderation and permission system

---

# 🎓 Academic Purpose

This project was developed as part of academic full-stack web development studies and was designed to demonstrate both backend and frontend capabilities in a realistic social media application.
