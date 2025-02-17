import React, { useState } from "react";
import AddTask from "./AddTask";
import Task from "./Task";

function App() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1 className="text-center mt-4">Task Management System</h1>
            <AddTask onTaskAdded={() => setRefresh(!refresh)} />
            <Task key={refresh} />
        </div>
    );
}

export default App;
