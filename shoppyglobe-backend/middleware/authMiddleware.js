const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header string: "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify authentication signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user info from database and attach it to the request object (excluding password)
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next(); // Pass control to the next endpoint controller logic
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token signature failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no verification token found' });
    }
};

module.exports = { protect };
