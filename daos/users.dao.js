const DBSOURCE = './database.sqlite';

const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(DBSOURCE);

function deletePassword(row) {
  delete row.password;
  return row;
}

function all() {
    console.log("Estoy en all");
    const stm = db.prepare('SELECT * FROM users');
    const rows = stm.all();
    rows.map((row) => deletePassword(row));
    console.log("Estoy en rows ");
    return rows;
}

function item(id) {
  //console.log("Estoy en item: "+id);
  const stm = db.prepare("SELECT * FROM users WHERE id = ?");
  const rows = stm.get(id);
  return deletePassword(rows);
}

function login(email, password) {
  const stm = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?");
  const rows = stm.get(email, password);
  return rows;
}
  
function create(user) {
  
  const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(user.email);
  
  if (existingUser) {
    throw new Error("El correo electrónico ya está en uso.");
  }

  const stm = db.prepare(
    "INSERT INTO users (id, name, last_name, email, password, image) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const info = stm.run(
    user.id,
    user.name,
    user.last_name,
    user.email,
    user.password,
    user.image
  );
  return info.lastInsertRowid;
}

function edit(user) {
  console.log("DAO: " + user.id);
  const stm = db.prepare(
    "UPDATE users SET name = ?, last_name = ?, email = ?, password = ?, image = ? WHERE id = ?"
  );
  const info = stm.run(
    user.name,
    user.last_name,
    user.email,
    user.password,
    user.image,
    user.id
  );
  console.log("INFO: ", info); // Imprimir el valor de info para depurar
  return info.changes;
}


function searchUsersByEmail(email) {
  const stm = db.prepare('SELECT * FROM users WHERE email LIKE ?');
  const users = stm.all(`%${email}%`);
  return users;
}

function getUsers(pageSize) {
  const stm = db.prepare('SELECT * FROM users LIMIT ?');
  const users = stm.all(pageSize);
  return users;
}

function getUserFriends(userId) {
  const stm = db.prepare('SELECT DISTINCT id_user_from, id_user_to FROM friendship WHERE (id_user_from = ? OR id_user_to = ?) AND status = ?');
  const rows = stm.all(userId, userId, "accepted");
  
  // Recorrer las filas y extraer los IDs únicos de los amigos
  const friendIds = [];
  for (const row of rows) {
    if (row.id_user_from !== userId) {
      friendIds.push(row.id_user_from);
    }
    if (row.id_user_to !== userId) {
      friendIds.push(row.id_user_to);
    }
  }

  // Obtener la información completa de los amigos utilizando los IDs obtenidos
  const friendList = [];
  for (const friendId of friendIds) {
    const friend = item(friendId);
    if (friend) {
      friendList.push(friend);
    }
  }

  return friendList;
}

function getUserFriendRequests(userId) {
  const stm = db.prepare('SELECT * FROM friendship WHERE id_user_to = ? AND status = ?');
  const friendRequests = stm.all(userId, "pending");
  return friendRequests;
}

function getLoggedFriends(userId) {
  const stm = db.prepare('SELECT * FROM friendship WHERE id_user_from = ? AND status = ?');
  const rows = stm.all(userId, "accepted");
  return rows;
}

function sendFriendRequest(userId, friendId, date) {
  const stm = db.prepare('INSERT INTO friendship (id_user_from, id_user_to, status, created_at) VALUES (?, ?, ?, ?)');
  const info = stm.run(userId, friendId, "pending", date);
  return info;
}

function acceptFriendRequest(petitionId) { 
  const stm = db.prepare('UPDATE friendship SET status = ? WHERE id = ?');
  const info = stm.run("accepted", petitionId);
  return info;
}

function rejectFriendRequest(petitionId) { 
  const stm = db.prepare('UPDATE friendship SET status = ? WHERE id = ?');
  const info = stm.run("rejected", petitionId);
  return info;
}

module.exports = {
  all,
  item,
  login,
  create,
  edit,
  searchUsersByEmail,
  getUsers,
  getUserFriends,
  getUserFriendRequests,
  getLoggedFriends,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};