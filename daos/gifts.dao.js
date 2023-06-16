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
function addGift (wishlistId, id_product, url, priority) {
    const stm = db.prepare(`
    INSERT INTO gifts (id_wishlist, id_product, url_product, priority)
    VALUES (?, ?, ?, ?)
  `);

  const new_gift = stm.run (wishlistId, id_product, url, priority);

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
    SET url_product = ?, priority = ?
    WHERE id = ?
    AND id_wishlist = ?
    `);

    //No estic del tot segur de si haig de retornar el regal o no
    const gift_updated = stm.run (url, priority, gift_id, wishlist_id);

    return gift_updated;
}

/**
 * Aquesta funció esborra de la base de dades un regal en determinat
 * @param {*} gift_id 
 */
function deleteGift (gift_id) {
    const stm = db.prepare(`
    DELETE FROM gifts
    WHERE id = ?
    `);

    stm.run (gift_id);
}

/**
 * Aquesta funció busca a la base de dades un regal en específic (si hi han diversos en diverses wishlists es retornen tots)
 * @param {*} wishlist_id 
 * @returns 
 */
function searchGiftsWishlist (wishlist_id) {
    const stm = db.prepare('SELECT * FROM gifts WHERE id_wishlist = ?');
    stm.run (wishlist_id);

    const gifts = stm.all();

    return gifts;
}

function searchGift (id) {
 //   console.log ("DAO -> id: " + id);
    const stm = db.prepare(`
    SELECT * FROM gifts
    WHERE id = ?
    `);

    const gift = stm.get (id);
 //   console.log ("DAO -> gift.user_id_booked: " + gift.user_id_book);
    return gift;
}

/**
 * Aquesta funció s'encarrega de reservar un regal en particular
 * @param {*} userId 
 * @param {*} giftId 
 */
function reserveGift(userId, giftId) {//, wishlist_id) {
    const stm = db.prepare(`
        UPDATE gifts
        SET user_id_booked = ? 
        WHERE id = ?`
    );

    stm.run (userId, giftId);
}

function deleteReservationGift (id) {
    const stm = db.prepare (`
    UPDATE gifts
    SET user_id_booked = NULL
    WHERE id = ?
    `);

    stm.run (id);
}

function searchUserGift (wishlist_id) {
//    console.log ("id_wishlist DAO: " + wishlist_id);
    const stm = db.prepare (`
    SELECT * FROM gifts
    WHERE id_wishlist = ?`
    );

    //stm.run (wishlist_id);

    const gifts = stm.all (wishlist_id);

    return gifts;
}

function searchUserReservedGifts (user_id_booked) {
//    console.log ("user_id_booked", user_id_booked);
    const stm = db.prepare (`
    SELECT * FROM gifts 
    WHERE user_id_booked = ?
    `);

    const gifts_booked = stm.all(user_id_booked);

    return gifts_booked;
}

function searchAllGifts () {
    console.log ("Searching")
    const stm = db.prepare (`
    SELECT * FROM gifts
    `);

    const gifts = stm.all();

    return gifts;
}

module.exports = {
    addGift,
    updateGift,
    deleteGift,
    searchGift,
    searchAllGifts,
    reserveGift,
    searchUserGift,
    searchUserReservedGifts,
    deleteReservationGift
};