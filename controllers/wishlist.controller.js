const router = require('../daos/users.dao.js');

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

async function createWishlist(req, res, next) {
    try {
        const data = req.body;

        let obj = {
            id: req.body.id,
            id_user: req.body.id_user,
            name: req.body.name,
            description: req.body.description,
            created_at: getDate(),
            finished_at: getDate()
        };

        let query = `INSERT INTO wishlist SET ?`;
        const [rows] = await router.promise().query(query, [obj]);
        console.log(rows.insertId);
        let query2 = `SELECT * FROM wishlist WHERE id = ?`;
        const [rows2] = await router.promise().query(query2, [rows.insertId]);
        res.status(201).json(rows2);
    } catch (error) {
        next(error);
    }
}

async function addGiftToWishlist(wishlistId, url, priority) {
    try {
        let query = `INSERT INTO gifts (wishlist_id, url, priority) VALUES (?, ?, ?)`;
        const [rows] = await router.promise().query(query, [wishlistId, url, priority]);
        console.log(`Gift added to wishlist with ID ${wishlistId}`);
        return rows.insertId;
    } catch (error) {
        console.error(`Failed to add gift to wishlist with ID ${wishlistId}: ${error}`);
        throw error;
    }
}

module.exports = {
    createWishlist, addGiftToWishlist
};