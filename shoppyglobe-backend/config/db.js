const mongoose = require('mongoose');
const { setServers } = require('node:dns/promises');

// Force Node to bypass shaky local ISP DNS routing
setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); // Stop the server if connection fails
    }
};

module.exports = connectDB;