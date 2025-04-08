import React from "react";
import { useState, useEffect } from "react";

const MyTasks = () => {
    const [mytasks, setMyTasks] = useState([]);
    useEffect(() => {
        
    },[]);
    return (
        <div className="my-tasks-container">
            <h2>My Tasks</h2>
            <div className="tasks-grid">
                {mytasks.map((task) => (
                    <div key={task.id} className="task-card">
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>Rewards:{task.rewards} points</p>
                        <p>Status: {task.status}</p>
                        <button>Complete Task</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyTasks;