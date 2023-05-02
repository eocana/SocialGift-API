const express = require("express");

const { all, item } = require("../controllers/users.controller.js");

const router = express.Router();

router.get("/users", all);
router.get("/users/:id", item);

module.exports = router;
