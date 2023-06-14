const express = require("express");

const {
  createWishlist,
  updateWishlist,
  showAllWishlists,
  showWishlist,
  deleteWishlist,
  showUserWishlists
} = require("../controllers/wishlist.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Ruta GET para /users/:id/wishlists

router.get("/users/:id/wishlist/", authMiddleware, showUserWishlists);
router.put ('/users/:id/wishlist/:idw', authMiddleware, updateWishlist);
router.delete("/users/:id/wishlist/:idw", authMiddleware, deleteWishlist);
router.post("/wishlist", authMiddleware, createWishlist);
router.get('/wishlists', authMiddleware, showAllWishlists);
router.get ('/wishlist/:idw', authMiddleware, showWishlist);

module.exports = router;