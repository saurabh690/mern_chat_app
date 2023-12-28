const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();   //instance of a router

router.route("/").get(protect, allUsers);    //whatever we add will be after /api/user end point
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
