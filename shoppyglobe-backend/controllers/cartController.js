const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Add item to cart
// @route   POST /cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; // Extracted safely from authMiddleware protect wrapper

        // 1. Requirement check: Validate if the product exists in DB
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // 2. Requirement check: Validate if enough physical stock is available
        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: `Insufficient stock. Only ${product.stockQuantity} items remaining.` });
        }

        // Find or create cart configuration for this specific authenticated user ID
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if item is already added to cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Update quantity if item already exists
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Push new item structure
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
    }
};

// @desc    Update item quantity in cart
// @route   PUT /cart/:id
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const productId = req.params.id;
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart layout not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in your cart' });
        }

        // Validate stock bounds before updating
        const product = await Product.findById(productId);
        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: `Insufficient stock available.` });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update cart', error: error.message });
    }
};

// @desc    Delete item from cart
// @route   DELETE /cart/:id
const deleteCartItem = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the selected item target ID
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete item', error: error.message });
    }
};

module.exports = { addToCart, updateCartItem, deleteCartItem };
