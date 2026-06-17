const dns = require('node:dns/promises');
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    description: "High-quality over-ear headphones with noise isolation and 20-hour battery life.",
    stockQuantity: 50
  },
  {
    name: "Ergonomic Wireless Mouse",
    price: 24.99,
    description: "Comfortable 2.4GHz wireless mouse with adjustable DPI settings.",
    stockQuantity: 100
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 79.99,
    description: "RGB backlit mechanical keyboard with tactile blue switches.",
    stockQuantity: 30
  },
  {
    name: "4K Ultra HD Action Camera",
    price: 119.99,
    description: "Waterproof sports action camera with wide-angle lens and stabilization.",
    stockQuantity: 15
  },
  {
    name: "Minimalist Leather Wallet",
    price: 34.99,
    description: "Slim RFID-blocking leather wallet with card slots and a money clip.",
    stockQuantity: 75
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    // Clear existing products to prevent duplicates
    await Product.deleteMany({});
    console.log("Old products cleared.");

    // Insert sample data
    await Product.insertMany(sampleProducts);
    console.log("Database seeded successfully with 5 products!");

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
