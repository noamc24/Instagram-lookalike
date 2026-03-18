const express = require("express");
const upload = require("../config/multer");

const {
  getUserProfile,
  followUser,
  unfollowUser,
  isFollowing,
  updateUserProfile,
  getUserGroups,
  deleteUser,
  getSuggestions,
  getUserStats,
  getFollowingUsers,
} = require("../controller/userController");

const router = express.Router();

router.get("/suggestions", getSuggestions);

router.get("/profile/:username", getUserProfile);
router.get("/is-following", isFollowing);
router.get("/following/:username", getFollowingUsers);
router.get("/:username/groups", getUserGroups);
router.get("/stats", getUserStats);

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

router.put("/update/:username", upload.single("profilePic"), updateUserProfile);

router.delete("/delete/:username", deleteUser);

module.exports = router;