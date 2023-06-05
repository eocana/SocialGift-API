const db = require('../daos/gifts.dao.js');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


  //Intel isense m'ha dit d'esborrar els await innecessaris

async function addGift(req, res) {
  try {
    const wishlistId = req.params.wishlistId;
    const { url, priority } = req.body;

    // Use the extracted data in the database query

    const new_gift = db.addGift(wishlistId, url, priority);

    await stmt.run(wishlistId, url, priority);

    res.sendStatus(200);
  } catch (error) {
    // Handle any errors that occurred during the asynchronous operations
    console.error(error);
    res.sendStatus(500);
  }
}

async function updateGift(req, res) {
  try {
    const giftId = req.params.giftId;
    const wishlist_id = req.query.wishlistId;
    const { url, priority } = req.body;

    const gift = db.updateGift(giftId, url, priority, wishlist_id);

    await stmt.run(url, priority, giftId);

    res.sendStatus(200);
  } catch (error) {
    // Handle any errors that occurred during the asynchronous operations
    console.error(error);
    res.sendStatus(500);
  }
}

async function deleteGift(req, res) {
  try {
    const giftId = req.params.giftId;
    const wishlist_id = req.query.wishlistId;
    const { url, priority } = req.body;

    db.deleteGift(giftId, wishlist_id);
    
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function searchGift(req, res) {
  try {
    const giftId = req.query.giftId;
    const gifts = await db.searchGift(giftId);
    res.json(gifts);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function reserveGift(req, res) {
  try {
    const giftId = req.query.giftId;
    const wishlist_id = req.query.wishlistId;
    const userId = req.query.userId;

    db.reserveGift(userId, giftId, wishlist_id);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


module.exports = {
  addGift,
  updateGift,
  deleteGift,
  searchGift,
  reserveGift,
};