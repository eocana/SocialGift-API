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
  const stm = db.prepare("SELECT * FROM users WHERE id = ?");
  const rows = stm.get(id);
  console.log(rows);
  return deletePassword(rows);
}

module.exports = {
  all,
  item,
};