import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const CreateTask = () => {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        rewards: "",
        status: "Open",
        requestorId: "",
        acceptorId: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userResponse = await axios.get(`http://localhost:3000/users/auth/${user.sub}`);
            const userData = userResponse.data;
            console.log(userData);
            console.log(userData.auth0Id);
            console.log(userData.rewards);
            console.log(taskData.rewards);
           
            //check if user has enough rewards
            if (userData.rewards < parseInt(taskData.rewards)) {
                alert('You do not have enough rewards to create this task.');
                return;
            }
            // Create task
            const taskResponse = await axios.post('http://localhost:3000/tasks', {
                name:taskData.name,
                description: taskData.description,
                status: "Open",
                requestorId: user.sub,
            requestorName: user.firstName,
            acceptorId: null,
            rewards: parseInt(taskData.rewards),
            });

            if (taskResponse.data){
                const newRewardBalance = userData.rewards - parseInt(taskData.rewards);
                await axios.put(`http://localhost:3000/users/auth/${user.sub}`, {
                    rewards: newRewardBalance,
            
                });
                alert('Task created successfully!');
                navigate("/tasks"); 
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        }}

    return (
        <div className="create-task-container">
            <h2>Create a New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>
                    Task Name:</label>
                    <input
                        type="text"
                        value={taskData.name}
                        onChange={(e) => setTaskData({...taskData, name: e.target.value })}
                    />
                    </div>
                    <div className="form-group">
                    <label>
                        Description:</label>
                        <textarea
                            value={taskData.description}
                            onChange={(e) => setTaskData({...taskData, description: e.target.value })}required
                        />
                        </div>
                        <div className="form-group">
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
