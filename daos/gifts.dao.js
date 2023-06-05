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
    const stm = db.prepare(`
    INSERT INTO gifts (wishlist_id, url, priority)
    VALUES (?, ?, ?)
  `);

  const new_gift = stm.run (wishlistId, url, priority);

  return new_gift;
}

/**
 * Aquesta funció actualitza un regal el qual se li passa el id del regal en questió
 * @param {*} wishlist_id 
 * @param {*} url 
 * @param {*} priority 
 * @returns 
 */
function updateGift (gift_id, url, priority, wishlist_id) {
    const stm = db.prepare(`
    UPDATE gifts
    SET url = ?, priority = ?
    WHERE id = ?
    AND wishlist_id = ?
    `);

    //No estic del tot segur de si haig de retornar el regal o no
    const gift_updated = stm.run (url, priority, gift_id, wishlist_id);

    return gift_updated;
}

/**
 * Aquesta funció esborra de la base de dades un regal en determinat
 * @param {*} gift_id 
 */
function deleteGift (gift_id, wishlist_id) {
    const stm = db.prepare(`
    DELETE gifts
    WHERE id = ?
    AND wishlist_id = ?
    `);

    stm.run (gift_id, wishlist_id);
}

/**
 * Aquesta funció busca a la base de dades un regal en específic (si hi han diversos en diverses wishlists es retornen tots)
 * @param {*} wishlist_id 
 * @returns 
 */
function searchGift (wishlist_id) {
    const stm = db.prepare('SELECT * FROM gifts WHERE id = ?');
    const gifts = stm.all();

    return gifts;
}

/**
 * Aquesta funció s'encarrega de reservar un regal en particular
 * @param {*} userId 
 * @param {*} giftId 
 */
function reserveGift(userId, giftId, wishlist_id) {
    const stm = db.prepare(`
        UPDATE gifts
        SET id_user_booked = ? 
        WHERE wishlist_id = ?
        AND id = ?`
    );

    stm.run (userId, wishlist_id, giftId);
}

module.exports = {
    addGift,
    updateGift,
    deleteGift,
    searchGift,
    reserveGift,
};