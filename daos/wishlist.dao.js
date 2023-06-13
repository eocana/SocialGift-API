const DBSOURCE = './database.sqlite';

const betterSqlite3 = require ('better-sqlite3');
const db = betterSqlite3 (DBSOURCE);

function createWishlists (id_user, name, description, description, created_at, finished_at) {
    const stm = db.prepare (`
    INSERT INTO wishlist (id, id_user, name, description, creation_at, finished_at)
    VALUES (?, ?, ?, ?, ?, ?)`);

    const new_wishlist = db.run (id, id_user, name, description, created_at, finished_at);

    return new_wishlist;
}

function update_wishlist (wishlist_id, name, description, new_date) {
    const stm = db.prepare (`
    UPDATE wishlist 
    SET name = ?, description = ?, new_date = ?
    WHERE wishlist_id = ?
    `);

    stm.run (name, description, new_date, wishlist_id);
}

function showAllWishlists () {
    const stm = db.prepare (`
    SELECT * FROM wishlist
    `);

    const wishlists = stm.run ();

    return wishlists;
}

function showWishlist (wishlist_id) {
    const stm = db.prepare (`
    SELECT * FROM wishlist
    WHERE wishlist_id = ?
    `);

    const wishlist = stm.run (wishlist_id);

    return wishlist;
}