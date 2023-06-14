const db = require('../daos/gifts.dao.js');

  //Intel isense m'ha dit d'esborrar els await innecessaris

async function addGift(req, res) {
  try {
    const wishlistId = req.body.id_wishlist;
    const id_product = req.body.id_product;
    const url = req.body.url_product;
    const priority = req.body.priority;

    // Use the extracted data in the database query

    const new_gift = db.addGift(wishlistId, id_product, url, priority);

    res.sendStatus(200);
  } catch (error) {
    // Handle any errors that occurred during the asynchronous operations
    console.error(error);
    res.sendStatus(500);
  }
}

async function updateGift(req, res) {
  try {
    const giftId = req.params.idg;
    const wishlist_id = req.params.idw;
    const url = req.body.url_product;
    const priority = req.body.priority;

    const gift = db.updateGift(giftId, url, priority, wishlist_id);

    res.sendStatus(200);
  } catch (error) {
    // Handle any errors that occurred during the asynchronous operations
    console.error(error);
    res.sendStatus(500);
  }
}

async function deleteGift(req, res) {
  try {
    const gift_id = req.params.idg;
    const wishlist_id = req.params.idw;

    db.deleteGift(gift_id);
    res.sendStatus (200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function searchUserGifts (req, res) {
  try {
    const wishlist_id = req.params.idw;
  //  const userId = req.body.userId;
    console.log (wishlist_id)
    const gifts = await db.searchUserGifts(wishlist_id);
    res.json (gifts);
  } catch (error) {
    res.status (500).json (error.message);
  };
}

async function searchUserReservedGifts (req, res) {
  try {
    const wishlist_id = req.params.wishlistId;
    const user_id = req.params.userId;
    const gift_booked = user_id;

    const booked_gifts = await db.searchUserReservedGifts (wishlist_id, user_id, gift_booked);

    res.json (booked_gifts)

  } catch (error) {
    res.status (500).json (error.message);
  };
}

async function searchGift(req, res) {
  try {
    const giftId = req.params.idg;
    const gifts = await db.searchGift(giftId);
    
    res.json(gifts);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


/**
 * Aquesta funció posa el id de l'usuari que reserva el regal
 */
async function reserveGift(req, res) {
  try {
    const giftId = req.params.idg;
    const userId = req.user.userId;

    db.reserveGift(userId, giftId);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


/**
 * Aquesta funció elimina la id de l'usuari que ha reservat un regal i posa el camp user_id_book a NULL
 */
async function deleteReservationGift (req, res) {
  try {
    const id_gift = req.params.idg;
    const myuser_id = req.user.userId;

  //  console.log ("Console log -> " + id_gift + ", " + myuser_id);

    const gift = await db.searchGift (id_gift);

  //  console.log ("Console log gift -> gift.user_id_booked: " + gift.user_id_booked + " myuser_id: " + myuser_id);
    if (gift.user_id_booked === myuser_id) {
      const booking_deletion = db.deleteReservationGift (id_gift);//, user_id_booked);
      res.json (booking_deletion);
    }
  } catch (error) {
    res.status (500).json(error.message);
  }
}

async function searchUserGift (req, res) {
  try {
    const user_id = req.user.userId;
    const wishlist_id = req.params.idw;
    let user_gifts = null;
  //  console.log ("id_wishlist: " + wishlist_id);
    if (req.query.reserved) {
  //    console.log ("TRUE");
      user_gifts = db.searchUserReservedGifts (user_id);
    } else {
      user_gifts = db.searchUserGift (wishlist_id);//, user_id);
    }
    res.json (user_gifts);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function searchAllGifts () {
  try {
    console.log ("HOLA?!");
    const all_gifts = await db.searchAllGifts ();
    console.log ("all_gifts", all_gifts);
  
    res.json (all_gifts);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  addGift,
  updateGift,
  deleteGift,
  searchGift,
  searchAllGifts,
  reserveGift,
  searchUserGift,
  deleteReservationGift
};