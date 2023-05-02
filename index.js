const express = require("express");

const cors = require("cors");

const bcrypt = require('bcrypt');

require('dotenv').config()


const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

const usersRouter = require("./routers/users.router.js");

app.use("/users", usersRouter);

// app.use("*", (req, res) => {
//     res.status(404).json({ error: "not found" });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});

