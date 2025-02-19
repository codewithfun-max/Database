import React from "react";
import { deleteBlog } from "../api/api";

const BlogCard = ({ blog, fetchBlogs, setEditingBlog }) => {
    const handleDelete = async () => {
        await deleteBlog(blog.id);
        fetchBlogs();
    };

    return (
        <div className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p><strong>Author:</strong> {blog.author}</p>
            <button onClick={() => setEditingBlog(blog)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default BlogCard;
