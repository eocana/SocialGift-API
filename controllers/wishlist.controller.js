const db = require('../daos/wishlist.dao.js');

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

async function createWishlist (req, res) {
    try {
        const id_user = req.user.userId;
        const name = req.body.name;
        const description = req.body.description;
        const created_at = getDate ();
        const finished_at = req.body.finished_at;

        const new_wishlist = db.createWishlist (id_user, name, description, created_at, finished_at);
        res.sendStatus (201).json (new_wishlist);
    } catch (error) {
        res.status (500).json ({message: error.message});
    }
}

async function updateWishlist (req, res) {
    try {
        const wishlist_id = req.params.idw;
        const name = req.body.name;
        const description = req.body.description;
        const new_date = req.body.finished_at;

        db.updateWishlist(wishlist_id, name, description, new_date);
        res.sendStatus(200);
        
    } catch (error) {
        res.status (500).json ({message: error.message});
    }
}

async function showAllWishlists (req, res) {
    try {
        const wishlists = await db.showAllWishlists();

        res.json (wishlists);
    } catch (error) {
        res.status(500).json({ message: err.message });
    };
}

async function showUserWishlists (req, res) {
    try {
        const user = req.params.id;

        console.log ("user_id: " + user);

        const wishlists = await db.showUserWishlists(user);
        
        res.json(wishlists);

    } catch (error) {
        res.status (500).json ({message: error.message});
    }
}

async function showWishlist (req, res) {
    try {
    //    const user_id = req.user.userId;
        const wishlist_id = req.params.idw;
        const wishlist = await db.showWishlist (wishlist_id)//, user_id);

        res.json (wishlist);
    } catch (error) {
        res.status (500).json({ message: error.message });
    }
}

async function deleteWishlist (req, res) {
    try {
        const user_id = req.params.id;
        const wishlist_id = req.params.idw;
        const myuser_id = req.user.userId;
//        console.log("usuario por parametro: " + user_id + " | mi usuario: " + myuser_id);
        if (user_id === myuser_id) { 
            const deleted_wishlist = db.deleteWishlist(wishlist_id);
        }
        res.sendStatus (200);//.json ({message: "Wishlist with id: " + wishlist_id + " succesfully deleted"});
    } catch (err) {
        res.status (500).json({ message: err.message });
    }
}

module.exports = {
    
    createWishlist, 
    showAllWishlists,
    showWishlist,
    showUserWishlists,
    deleteWishlist,
    updateWishlist,
    
};