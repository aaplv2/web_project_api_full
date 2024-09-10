const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

// const { celebrate } = require('celebrate')

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/users/me", getCurrentUser)
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
