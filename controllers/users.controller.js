const db = require("../daos/users.dao.js");
const jwt = require('jsonwebtoken');



function generateAccessToken(userId) {
  return jwt.sign({ userId }, 'clave_secreta');
}


async function all(req, res) {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    if (pageSize !== null || pageSize !== undefined || pageSize !== "" || pageSize !== 0 || pageSize !== NaN) {
      const users = await db.getUsers(pageSize);
    } else {
        const users = await db.all();
    }  
    res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

async function item(req, res) {
  try {
    const row = await db.item(req.params.id);
    res.json(row);
  } catch (ex) {
    res.status(500).json({ error: ex.message});
  }
}

async function login(req, res) {
    try {
        const user = await db.login(req.body.email, req.body.password);

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        console.log("Mi ID de usuario es: "+user.id);
        const accessToken = generateAccessToken(user.id);
        res.json({ accessToken });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function create(req, res) {
    try {
        const user = await db.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
} 

async function getLoggedInUser(req, res) {
 
  try {
    const userId = req.user.userId;
    const user = await db.item(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.log("Estoy en getLoggedInUser catch: " + err);
    res.status(500).json({ message: "err.message" });
  }
}

async function editUser(req, res) {

  try {
    const userId = req.user.userId;

    if (userId === "@me") {
      console.log("Estoy editando mi perfil");
    }

    const user = await db.edit(userId);
    if (!user) {
      return res.status(404).json({ message: "err.message" });
    }
  } catch (err) {
    console.log("Estoy en editUser catch: ");
    res.status(500).json({ message: "err.message" });
  }
}

async function searchUsers(req, res) {
  try {
    const email = req.query.s; ///search?s=loquesea
    const users = await db.searchUsersByEmail(email);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = {
  all,
  item,
  login,
  create,
  getLoggedInUser,
  editUser,
  searchUsers,
    
};
