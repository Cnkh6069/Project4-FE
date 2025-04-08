import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        rewards: "",
        status: "Open",
        requestorId: "",
        acceptorId: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/tasks', taskData);
            navigate("/tasks");
        } catch (error) {
            console.error('Error creating task:', error);
        }
        }

    return (
        <div className="create-task-container">
            <h2>Create a New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    Task Name:</label>
                    <input
                        type="text"
                        value={taskData.name}
                        onChange={(e) => setTaskData({...taskData, name: e.target.value })}
                    />
                    </div>
                    <div>
                    <label>
                        Description:</label>
                        <textarea
                            value={taskData.description}
                            onChange={(e) => setTaskData({...taskData, description: e.target.value })}required
                        />
                        </div>
                        <div>
                        <label>
                            Rewards:</label>
                            <input
                                type="number"
                                value={taskData.rewards}
                                onChange={(e) => setTaskData({...taskData, rewards: e.target.value })}required
                            />
                            </div>
                            <button type="submit">
                                Create Task</button>
                                </form>
                                </div>
                                );
                                };
                                export default CreateTask;
