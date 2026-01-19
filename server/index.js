const bcrypt = require("bcrypt");


const User = require("./models/user");
const Capsule = require("./models/capsule");


const mongoose = require("mongoose");

const express = require("express");
const app = express();


mongoose.connect(
  "mongodb+srv://timecapsuleuser:varshita@timecapsulecluster.xqj6u6v.mongodb.net/timecapsuleDB"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


// CORS fix
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// ===============================
// TEMP BACKEND STORAGE
// ===============================



// ===============================
// AUTH APIs
// ===============================

// Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.json({ message: "Registration successful" });
});



// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  // 🔐 Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", email });
});



// ===============================
// CAPSULE APIs (User-based)
// ===============================

// Create capsule
app.post("/capsule", async (req, res) => {
  const { message, unlockDate, email } = req.body;

  const capsule = new Capsule({
    message,
    unlockDate,
    email
  });

  await capsule.save();

  res.json({ message: "Capsule saved successfully" });
});


// Get capsules for logged-in user
app.get("/capsules/:email", async (req, res) => {
  const capsules = await Capsule.find({ email: req.params.email });
  res.json(capsules);
});


// Delete capsule
app.delete("/capsule/:id", async (req, res) => {
  await Capsule.findByIdAndDelete(req.params.id);
  res.json({ message: "Capsule deleted successfully" });
});


// ===============================
// SERVER START
// ===============================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
