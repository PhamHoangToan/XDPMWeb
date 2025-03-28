const express = require("express");
const { getUsers, getUserById, createUser, updateUser, deleteUser, register, login, googleLogin } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/register", register);
router.post("/login", login);
router.post("/gg", googleLogin);

module.exports = router;
