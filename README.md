# 🕰️ Time Capsule Web Application

A full-stack web application that allows users to write messages to their future selves and unlock them on a chosen future date.

---

## 🚀 Features

- User registration and login
- Secure password hashing using bcrypt
- Create personal time capsules
- Capsules unlock only after the selected date
- User-specific capsules
- Clean and simple UI
- Data stored permanently using MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Security
- bcrypt for password hashing

---

## 📂 Project Structure
time-capsule-app/
│
├── client/
│ ├── login.html
│ ├── register.html
│ ├── create.html
│ ├── capsules.html
│ ├── style.css
│ └── script.js
│
├── server/
│ ├── models/
│ │ ├── User.js
│ │ └── Capsule.js
│ ├── index.js
│ └── package.json
│
└── README.md


---

##⚙️ How It Works

1. Users register and log in
2. Passwords are securely hashed before storing
3. Logged-in users create time capsules with a future unlock date
4. Capsules remain locked until the unlock date
5. All data is stored in MongoDB Atlas

---
## ▶️ How to Run Locally

###1.Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/time-capsule-app.git

###2. Navigate to server folder
```bash
cd time-capsule-app/server

###3. Install dependencies
```bash
npm install

###4. Create a .env file
```bash
MONGO_URI=your_mongodb_connection_string

###5. Start the server
```bash
node index.js

###6. Open the frontend
```bash
Open client/login.html in your browser.

Developed by chintanippu varshita
