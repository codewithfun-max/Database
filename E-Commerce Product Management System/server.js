require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password",
    database: "ecommerce_db",
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Add a new product
app.post("/products", (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const sql = "INSERT INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, description, price, category, stock], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Product added", id: result.insertId });
    });
});

// Get all products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Update a product
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const sql = "UPDATE products SET name=?, description=?, price=?, category=?, stock=? WHERE id=?";
    db.query(sql, [name, description, price, category, stock, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product updated" });
    });
});

// Delete a product
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product deleted" });
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
