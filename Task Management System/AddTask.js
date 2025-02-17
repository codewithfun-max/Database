import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Title is required!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/tasks", {
                title,
                description,
                status: "Pending",
                due_date: dueDate,
            });

            onTaskAdded();  // Refresh the task list
            setTitle("");
            setDescription("");
            setDueDate("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title:</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Description:</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label>Due Date:</label>
                    <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
