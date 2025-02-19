import React, { useState, useEffect } from "react";
import { createBlog, updateBlog } from "../api/api";

const BlogForm = ({ fetchBlogs, editingBlog, setEditingBlog }) => {
    const [blog, setBlog] = useState({ title: "", content: "", author: "" });

    useEffect(() => {
        if (editingBlog) {
            setBlog(editingBlog);
        }
    }, [editingBlog]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingBlog) {
            await updateBlog(editingBlog.id, blog);
        } else {
            await createBlog(blog);
        }
        fetchBlogs();
        setBlog({ title: "", content: "", author: "" });
        setEditingBlog(null);
    };

    return (
        <div>
            <h2>{editingBlog ? "Edit Blog" : "Add a New Blog"}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={blog.title} onChange={handleChange} placeholder="Title" required />
                <textarea name="content" value={blog.content} onChange={handleChange} placeholder="Content" required />
                <input type="text" name="author" value={blog.author} onChange={handleChange} placeholder="Author" required />
                <button type="submit">{editingBlog ? "Update" : "Post"}</button>
            </form>
        </div>
    );
};

export default BlogForm;
