const router = require('express').Router();

const { addGift, updateGift, deleteGift, searchGift, reserveGift} = require('../controllers/gifts.controller');
const { addGift } = require('../daos/gifts.dao');

router.post ("/gift", addGift)
router.put ("/gift", updateGift);
router.get ("/gift", searchGift);
router.delete ("/gift", deleteGift);
router.put ("/gift", reserveGift);

module.exports = router;