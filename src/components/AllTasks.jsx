import React from "react";
import { useState, useEffect } from "react";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        
    },[])
    return (
        <div className="tasks-container">
            <h2>Guild Board</h2>
            <div className="task-grid">
                {tasks.map((task) => (
                    <div key={task.id} className="task-card">
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>Rewards: {task.rewards} points</p>
                        <p>Status: {task.status}</p>
                        <button>Accept Task</button></div>
                ))}
                </div>
            </div>);};
            export default AllTasks;
