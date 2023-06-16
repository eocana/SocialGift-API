const express = require("express");

const { all, item, login, create, getLoggedInUser, editUser, searchUsers, getLoggedInUserFriends, getUserFriends, getUserFriendRequests, sendFriendRequest, actionFriendRequest} = require("../controllers/users.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Mi usuario
router.post("/login", login);
router.post("/", create);

router.get("/profile", authMiddleware, getLoggedInUser);
router.get("/@me", authMiddleware, getLoggedInUser);

router.put("/@me", authMiddleware, editUser);
router.put("/profile", authMiddleware, editUser);

// Otros usuarios y interacciones

router.get("/:id", authMiddleware, item);
router.put("/:id", authMiddleware, editUser); //Solo el admin
router.get("/search", authMiddleware, searchUsers);
router.get("/", authMiddleware, all); // con pageSize
router.get("/all", authMiddleware, all); // lista sin limitiaciones

router.get('/@me/friends', authMiddleware, getLoggedInUserFriends);
router.get('/:id/friends', authMiddleware, getUserFriends);

router.get('/@me/friends/requests', authMiddleware, getUserFriendRequests);
router.get('/:id/friends/requests', authMiddleware, getUserFriendRequests);

router.post("/friends/:id", authMiddleware, sendFriendRequest);
router.put("/friends/:id", authMiddleware, actionFriendRequest);
router.get("/friends", authMiddleware, getUserFriendRequests);


// Ruta /users/:id/wishlists anidada en /users/:id
//router.use('/users/:id/wishlists', wishlistsRouter);

module.exports = router;
