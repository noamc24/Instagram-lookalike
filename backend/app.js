const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./config/db");
const seedData = require("./seed");

const authRouter = require("./routes/authRoute");
const usersRouter = require("./routes/userRoute");
const postsRouter = require("./routes/postsRoute");
const groupsRouter = require("./routes/groupRoute");
const postsExtrasRouter = require("./routes/postsExtrasRoute");
const storiesRouter = require("./routes/storiesRoute");
const statsRouter = require("./routes/statsRoute");
const externalRouter = require("./routes/externalRoute");
const messagesRouter = require("./routes/messageRoute");

const app = express();
const PORT = 3000;

console.log("APP FILE RUNNING FROM:", __filename);
console.log("APP DIR:", __dirname);

// =========================
// Middlewares
// =========================
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// =========================
// Static files
// =========================

// uploads
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

app.use("/assets", express.static(path.join(__dirname, "..", "frontend", "assets")));
app.use("/css", express.static(path.join(__dirname, "..", "frontend", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "frontend", "js")));

// =========================
// API routes
// =========================
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/post-extras", postsExtrasRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/stats", statsRouter);
app.use("/api/external", externalRouter);
app.use("/api/messages", messagesRouter);

// =========================
// Frontend pages
// =========================

app.get("/", (req, res) => {
  console.log("HOME ROUTE HIT");
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "feed.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "signUp.html"));
});

app.get("/feed", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "feed.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "profile.html"));
});

app.get("/profile/:username", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "profile.html"));
});

  app.get("/publicprofile", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "publicprofile.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "stats.html"));
});

app.get("/messages", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "html", "messagePage.html"));
});
// =========================
// 404
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================
// Start server
// =========================
connectDB()
  .then(async () => {
    await seedData();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error);
  });