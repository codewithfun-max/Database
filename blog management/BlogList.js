import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/api";
import BlogCard from "./BlogCard";

const BlogList = ({ setEditingBlog }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const response = await getBlogs();
        setBlogs(response.data);
    };

    return (
        <div className="blog-container">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} fetchBlogs={fetchBlogs} setEditingBlog={setEditingBlog} />
                ))
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    );
};

export default BlogList;
