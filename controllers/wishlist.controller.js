const db = require('../daos/wishlist.dao.js');

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

//Funció feta per chatgpt
async function createWishlist(wishlistData) {
    try {
      const response = await fetch('https://your-api-endpoint/wishlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishlistData),
      });
  
      const wishlist = await response.json();
      console.log('Wishlist created:', wishlist);
      return wishlist;
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
}

const newWishlist = {
    id_user: 1,
    name: 'My Birthday Wishlist',
    description: 'Gift ideas for my birthday',
    creation_at: new Date().toISOString(),
    finished_at: null, // You can set a specific date here if applicable
  };
  
createWishlist(newWishlist);

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
        const [rows2] = await db.promise().query(query2, [rows.insertId]);
        res.status(201).json(rows2);
    } catch (error) {
        next(error);
    }
}

async function updateWishlist (req, res) {
    try {
        const wishlist_id = req.query.wishlist_id;
        const name = req.query.name;
        const description = req.query.description;
        const new_date = getDate();

        db.updateWishlist(wishlist_id, name, description, new_date);
        res.sendStatus (201);
    }
}

async function showAllWishlists () {
    try {
        const wishlists = await db.showAllWishlists();

        res.json (wishlists);
    } catch (error) {
        res.status(500);
    };
}

async function showWishlist (req, res) {
    try {
        const wishlist_id = req.query.body.wishlist_id;
        const wishlist = await db.showWishlist (wishlist_id);

        res.json (wishlist);;
    } catch (error) {
        res.status (500);
    }
}

module.exports = {
    createWishlist, addGiftToWishlist
};