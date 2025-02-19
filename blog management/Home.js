import React, { useState } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const Home = () => {
    const [editingBlog, setEditingBlog] = useState(null);

    return (
        <div>
            <h1>Blog Management System</h1>
            <BlogForm fetchBlogs={() => {}} editingBlog={editingBlog} setEditingBlog={setEditingBlog} />


            <BlogList setEditingBlog={setEditingBlog} />
        </div>
    );
};

export default Home;
