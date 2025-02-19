const db = require("../config/db");

exports.getAllBlogs = (req, res) => {
    db.query("SELECT * FROM blogs", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.getBlogById = (req, res) => {
    db.query("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

exports.createBlog = (req, res) => {
    const { title, content, author } = req.body;
    db.query("INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)", [title, content, author], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Blog added!", id: result.insertId });
    });
};

exports.updateBlog = (req, res) => {
    const { title, content, author } = req.body;
    db.query("UPDATE blogs SET title=?, content=?, author=? WHERE id=?", [title, content, author, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Blog updated!" });
    });
};

exports.deleteBlog = (req, res) => {
    db.query("DELETE FROM blogs WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Blog deleted!" });
    });
};
