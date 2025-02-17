import React, { useState, useEffect } from "react";
import axios from "axios";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredTasks = filter === "All"
        ? tasks
        : tasks.filter(task => task.status === filter);
        const editTask = (task) => {
            const newTitle = prompt("Edit Title", task.title);
            if (newTitle !== null) {
                axios.put(`http://localhost:5000/tasks/${task.id}`, { 
                    title: newTitle, 
                    description: task.description, 
                    status: task.status,
                    due_date: task.due_date
                }).then(() => fetchTasks());
            }
        };
        
        const deleteTask = (id) => {
            if (window.confirm("Are you sure you want to delete this task?")) {
                axios.delete(`http://localhost:5000/tasks/${id}`)
                    .then(() => fetchTasks())
                    .catch((error) => console.error("Error deleting task:", error));
            }
        };
        
        const updateStatus = (id, newStatus) => {
            axios.put(`http://localhost:5000/tasks/${id}`, { 
                title: tasks.find(t => t.id === id).title, 
                description: tasks.find(t => t.id === id).description, 
                status: newStatus,
                due_date: tasks.find(t => t.id === id).due_date
            }).then(() => fetchTasks());
        };
        
    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            
            <div className="mb-3">
                <label>Filter by Status:</label>
                <select onChange={handleFilterChange} className="form-select w-25">
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <select 
                                    value={task.status} 
                                    onChange={(e) => updateStatus(task.id, e.target.value)}
                                    className="form-select"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                            <td>{task.due_date}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => editTask(task)}>Edit</button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteTask(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tasks;
