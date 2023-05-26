const db = require('../daos/users.dao.js');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

async function addGift(req, res) {
  try {
    const wishlistId = req.params.wishlistId;
    const { url, priority } = req.body;

    //TODO lo del stmt s'ha de posar en el gifts.dao.js
    // Use the extracted data in the database query
    const stmt = db.prepare(`
      INSERT INTO gifts (wishlist_id, url, priority)
      VALUES (?, ?, ?)
    `);

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
    const { url, priority } = req.body;

    //TODO lo del stmt s'ha de posar en el gifts.dao.js
    // Use the extracted data in the database query
    const stmt = db.prepare(`
      UPDATE gifts
      SET url = ?, priority = ?
      WHERE id = ?
    `);

    await stmt.run(url, priority, giftId);

    res.sendStatus(200);
  } catch (error) {
    // Handle any errors that occurred during the asynchronous operations
    console.error(error);
    res.sendStatus(500);
  }
}

  module.exports = {
    addGift,
  }