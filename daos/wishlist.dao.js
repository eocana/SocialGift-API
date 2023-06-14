const DBSOURCE = './database.sqlite';

const betterSqlite3 = require ('better-sqlite3');
const db = betterSqlite3 (DBSOURCE);

function createWishlist (id_user, name, description, created_at, finished_at) {
    const stm = db.prepare (`
    INSERT INTO wishlist (id_user, name, description, creation_at, finished_at)
    VALUES (?, ?, ?, ?, ?)`);

    //console.log ("Console.log CreateWishlist (DAO) ->" + name + ", " + description + ", " + created_at + "->" + finished_at);


    stm.run (id_user, name, description, created_at, finished_at);
}

function updateWishlist (wishlist_id, name, description, new_date) {
    const stm = db.prepare (`
    UPDATE wishlist 
    SET name = ?, description = ?, finished_at = ?
    WHERE id = ?
    `);

    stm.run (name, description, new_date, wishlist_id);
}

function showAllWishlists () {
    const stm = db.prepare (`
    SELECT * FROM wishlist
    `);

    const wishlists = stm.all ();

    return wishlists;
}

function showUserWishlists (user_id) {
    const stm = db.prepare (`
    SELECT * FROM wishlist
    WHERE id_user = ?
    `);

    //console.log ("(DAO) user_id: " + user_id);
    const wishlists = stm.all (user_id);
    

    return wishlists;
}

function showWishlist (wishlist_id, user_id) {
    const stm = db.prepare (`
    SELECT * FROM wishlist
    WHERE id = ?
    AND id_user = ?
    `);

    const wishlist = stm.get (wishlist_id, user_id);

    return wishlist;
}

function deleteWishlist (wishlist_id) {
    const stm = db.prepare (`
    DELETE FROM wishlist
    WHERE id = ?
    `);

    stm.run (wishlist_id);
}

module.exports = {
    deleteWishlist,
    showAllWishlists,
    showUserWishlists,
    showWishlist,
    createWishlist,
    updateWishlist
}