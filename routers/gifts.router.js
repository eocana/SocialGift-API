const router = require('express').Router();

const { 
    addGift, 
    updateGift, 
    deleteGift, 
    searchGift,
    searchAllGifts,
    reserveGift,
    searchUserGift,
    deleteReservationGift
} = require('../controllers/gifts.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');

router.post ("/:idg/reservation", authMiddleware, reserveGift);
router.post ("/", authMiddleware, addGift) //Afegeix un nou regal

router.put ("/wishlist/:idw/gift/:idg", authMiddleware, updateGift); //actualitza la prioritat, la url i si s'ha reservat  o no

router.get ("/all", authMiddleware, searchAllGifts);
router.get ("/:idg", authMiddleware, searchGift); //busca qualsevol regal
router.get ("/wishlist/:idw/gifts", authMiddleware, searchUserGift); //busca tots els regals pertanyents a un usuari
router.get ("/users/:idu/gift", authMiddleware, searchUserGift);//searchUserReservedGifts); //busca els regals reservats d'un usuari


router.delete ("/wishlist/:idw/gift/:idg", authMiddleware, deleteGift);
router.delete ("/:idg/reservation", authMiddleware, deleteReservationGift);


module.exports = router;