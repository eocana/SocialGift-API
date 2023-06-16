const express = require("express");

const cors = require("cors");

const bcrypt = require('bcrypt');

require('dotenv').config()


const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

const usersRouter = require("./routers/users.router.js");
const wishlistRouter = require("./routers/wishlist.router.js");
const giftRouter = require("./routers/gifts.router.js");

app.use("/users", usersRouter);
app.use("/wishlists", wishlistRouter);
app.use ("/gifts", giftRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});

