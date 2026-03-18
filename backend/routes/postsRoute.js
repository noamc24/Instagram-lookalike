const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const postsController = require("../controller/postsController");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

// יצירת תיקיית uploads אם לא קיימת
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

router.post(
  "/",
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("POST UPLOAD ERROR:", err);
        return res.status(400).json({
          success: false,
          message: "שגיאה בהעלאת הקובץ",
          error: err.message,
        });
      }

      console.log("POST FILE:", req.file);
      console.log("POST BODY:", req.body);
      next();
    });
  },
  postsController.createPost
);

router.get("/user/:username", postsController.getPostsByUser);
router.get("/feed/:username", postsController.getFeed);
router.get("/explore", postsController.getExplore);

router.put("/:id", postsController.updatePost);
router.delete("/:id/:username", postsController.deletePost);

module.exports = router;