const express = require('express');
const router = express.Router();
const { addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Secure all operations so only users with a valid login token can access them
router.post('/', protect, addToCart);
router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, deleteCartItem);

module.exports = router;
