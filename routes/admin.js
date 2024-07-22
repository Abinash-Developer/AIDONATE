const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");

router.post("/login", authController.login);
router.get(
  "/get_category",
  categoryController.getCategory
);
router.use(authMiddleware.protect);
router.post(
  "/get_user",
  authMiddleware.restrictTo("admin"),
  adminController.getAllUsers
);

//Category routes
router.post(
  "/add_categry",
  authMiddleware.restrictTo("admin"),
  categoryController.addCategory
);


module.exports = router;
