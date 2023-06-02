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

async function addGift(req, res) {
  try {
    const wishlistId = req.params.wishlistId;
    const { url, priority } = req.body;

      // Use the extracted data in the database query
    //TODO lo del stmt s'ha de posar en el gifts.dao.js
    //Aqui cridar la funcio db.addGift i que retorni 

    const new_gift = await db.addGift(wishlistId, url, priority);

    //TODO revisar si encara haig de posar el stmt.run 
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

    const gift = await db.updateGift(giftId, url, priority);

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
    const { url, priority } = req.body;

    
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

}

  module.exports = {
    addGift,
    updateGift,
    deleteGift,
  }