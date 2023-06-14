const express = require("express");

const { all, item, login, create, getLoggedInUser, editUser, searchUsers } = require("../controllers/users.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Mi usuario
router.post("/login", login);
router.post("/", create);
router.get("/profile", authMiddleware, getLoggedInUser);
router.get("/@me", authMiddleware, getLoggedInUser);
router.put("/@me", authMiddleware, editUser);
router.put("/profile", authMiddleware, editUser);

// Otros usuarios
router.get("/:id", authMiddleware, item);
router.put("/:id", authMiddleware, editUser); // Solo el admin
router.get("/search", authMiddleware, searchUsers);
router.get("/", authMiddleware, all);
router.get("/all", authMiddleware, all);




module.exports = router;
