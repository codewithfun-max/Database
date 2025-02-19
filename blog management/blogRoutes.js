const express = require("express");
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");

const router = express.Router();

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
