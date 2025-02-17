require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // To handle JSON requests

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if you use a different MySQL user
    password: "Password", // Add your MySQL password
    database: "task_manager",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// API Routes

// 1. Fetch all tasks
app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Add a new task
app.post("/tasks", (req, res) => {
    const { title, description, status, due_date } = req.body;
    db.query(
        "INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)",
        [title, description, status || "Pending", due_date],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, title, description, status, due_date });
        }
    );
});

// 3. Update a task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    db.query(
        "UPDATE tasks SET title=?, description=?, status=?, due_date=? WHERE id=?",
        [title, description, status, due_date, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Task updated successfully" });
        }
    );
});

// 4. Delete a task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tasks WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Task deleted successfully" });
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
