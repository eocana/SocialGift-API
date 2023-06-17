const db = require("../daos/users.dao.js");
const jwt = require('jsonwebtoken');
const uuid = require("uuid");


function generateAccessToken(userId) {
  return jwt.sign({ userId }, 'clave_secreta');
}

function dataActual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

async function all(req, res) {
  console.log("Estoy en all controller");
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    let users;

    if (pageSize !== null && pageSize !== undefined && pageSize !== "" && pageSize !== 0 && !isNaN(pageSize)) {
      users = await db.getUsers(pageSize);
    } else {
      users = await db.all();
    }

    res.json(users);
  } catch (err) {
    console.log("Estoy en all catch: " + err);
    res.status(500).json({ message: err.message + " Error en el all controller" });
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

    const user = {
      id: uuid.v4(),
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
    };
       
    await db.create(user);
    
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
    res.status(500).json({ message: err.message });
  }
}

async function editUser(req, res) {

  try {

    let userId = req.params.id;
    

    if (userId === "@me" || userId === "profile") {
      
      userId = req.user.userId;
    
      console.log("Estoy editando mi perfil"); 
    } 

    console.log("editUser ID: "+userId);
    
    const user = {
      id: userId,
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
    };
    
    const info = await db.edit(user);
    

    if (!info) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }


    return res.status(202).json("Updated");
  
  } catch (err) {
    console.log("Estoy en editUser catch: "+err);
    res.status(500).json({ message: err.message });
  }
}

async function searchUsers(req, res) {
  try {
    const email = req.query.s;
    console.log(email);
    const users = await db.searchUsersByEmail(email);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getLoggedInUserFriends(req, res) {

  try {
    const userId = req.user.userId;
    const friends = await db.getUserFriends(userId);
    res.json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}

async function getUserFriends(req, res) {
  try {
    const userId = req.params.id;
    const friends = await db.getUserFriends(userId);
    res.json(friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserFriendRequests(req, res) {
  try {
    const userId = req.params.id;;
    let friendRequests;
    console.log("HOLALA: "+req.params.id);
    if (userId === "@me") {
      const id = req.user.userId;
      console.log("Mi id: " + id);
      friendRequests = await db.getUserFriendRequests(id);
    } else {

      friendRequests = await db.getUserFriendRequests(userId);
    }

    res.json(friendRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function sendFriendRequest(req, res) { 
  try {
    const userId = req.user.userId;
    const friendId = req.params.id;
    const friendRequest = await db.sendFriendRequest(userId, friendId, dataActual());
    res.json(friendRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function actionFriendRequest(req, res) {
  try {
    const petitionId = req.params.id;

    const action = req.query.a;
    console.log("Action: "+action);
    let friendRequest;

    switch (action) {
      case "accept": friendRequest = await db.acceptFriendRequest(petitionId);
        break;
      case "reject": friendRequest = await db.rejectFriendRequest(petitionId);
        break;
      default:
        console.log("ERROR");
        break;

    }
    res.json(friendRequest);

  } catch (err) {
    console.log("Estoy en actionFriendRequest catch: ");
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
  getLoggedInUserFriends,
  getUserFriends,
  getUserFriendRequests,
  sendFriendRequest,
  actionFriendRequest
    
};