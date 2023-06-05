const DBSOURCE = './database.sqlite';

const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(DBSOURCE);

function deletePassword(row) {
  delete row.password;
  return row;
}

function all() {
    const stm = db.prepare('SELECT * FROM users');
    const rows = stm.all();
    rows.map((row) => deletePassword(row));
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

function edit(userId) {
  const stm = db.prepare("UPDATE users SET name = ?, last_name = ?, email = ?, password = ?, image = ? WHERE id = ?");
  const info = stm.run(user.name, user.last_name, user.email, user.password, user.image, userId);
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



module.exports = {
  all,
  item,
  login,
  create,
  edit,
  searchUsersByEmail,
  getUsers,
};