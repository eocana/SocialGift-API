const DBSOURCE = './database.sqlite';

const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3(DBSOURCE);

/**
 * Aquesta funció crea un nou regal a la base de dades i el retorna al controlador.
 * @param {} wishlistId 
 * @param {*} url 
 * @param {*} priority 
 * @returns 
 */
function addGift (wishlistId, url, priority) {
    const stmt = db.prepare(`
    INSERT INTO gifts (wishlist_id, url, priority)
    VALUES (?, ?, ?)
  `);

  const new_gift = stmt.run (wishlistId, url, priority);

  return new_gift;
}

function updateGift (wishlist_id, url, priority) {
    // Use the extracted data in the database query
    const stmt = db.prepare(`
    UPDATE gifts
    SET url = ?, priority = ?
    WHERE id = ?
    `);
}

function deleteGift (gift_id) {
    const stmt = db.prepare(`
    DELETE gifts
    WHERE id = ?
    `);
}

module.exports = {
    addGift,
    updateGift,
    deleteGift,
};