const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { createPrice } = require('../controllers/priceController');

const router = express.Router();

///PROTECTED ROUTES
router.use(checkAuth);
router.post('/', createPrice);

module.exports = router;