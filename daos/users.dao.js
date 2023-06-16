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
  const stm = db.prepare("INSERT INTO users (name, last_name, email, password, image) VALUES (?, ?, ?, ?, ?)");
  const info = stm.run(user.name, user.last_name,user.email, user.password, user.image);
  return item(info.lastInsertRowid);
}

function edit(user) {
  const stm = db.prepare("UPDATE users SET name = ?, last_name = ?, email = ?, password = ?, image = ? WHERE id = ?");
  const info = stm.run(user.name, user.last_name, user.email, user.password, user.image, user.userId);
  return item(info.lastInsertRowid);
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
  const stm = db.prepare('SELECT DISTINCT id_user_from, id_user_to FROM friendship WHERE (id_user_from = ? OR id_user_to = ?) AND status = "accepted"');
  const rows = stm.all(userId, userId);
  
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
    const friend = db.getUserById(friendId);
    if (friend) {
      friendList.push(friend);
    }
  }

  return friendList;
}

function getUserFriendRequests(userId) {
  const stm = db.prepare('SELECT * FROM friendship WHERE id_user_to = ? AND status = "pending"');
  const friendRequests = stm.all(userId);
  return friendRequests;
}

function getLoggedFriends(userId) {
  const stm = db.prepare('SELECT * FROM friendship WHERE id_user_from = ? AND status = "accepted"');
  const rows = stm.all(userId);
  return rows;
}

function sendFriendRequest(userId, friendId) {
  const stm = db.prepare('INSERT INTO friendship (id_user_from, id_user_to, status) VALUES (?, ?, "pending")');
  const info = stm.run(userId, friendId);
  return info;
}

function acceptFriendRequest(petitionId) { 
  const stm = db.prepare('UPDATE friendship SET status = "accepted" WHERE id = ?');
  const info = stm.run(petitionId);
  return info;
}

function rejectFriendRequest(petitionId) { 
  const stm = db.prepare('UPDATE friendship SET status = "rejected" WHERE id = ?');
  const info = stm.run(petitionId);
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