const express = require("express");

const { all, item, login } = require("../controllers/users.controller.js");

const router = express.Router();

router.get("/users", all);
router.get("/:id", item);
router.post("/login", login);
module.exports = router;
