const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const { celebrate } = require("celebrate");
const {
  profileUpdateValidator,
  avatarUpdateValidator,
} = require("../models/validation");

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/me", getCurrentUser);
router.patch("/me", celebrate({ body: profileUpdateValidator }), updateUser);
router.patch(
  "/me/avatar",
  celebrate({ body: avatarUpdateValidator }),
  updateAvatar
);

module.exports = router;
