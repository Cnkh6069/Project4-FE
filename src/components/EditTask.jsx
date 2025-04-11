import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const EditTask = () => {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const location = useLocation();
    const { user } = useAuth0();
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        rewards: '',
        status: ''
    });

    useEffect(() => {
        if (location.state?.task) {
            const { name, description, rewards, status } = location.state.task;
            setTaskData({ name, description, rewards, status });
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userResponse = await axios.get(`http://localhost:3000/users/auth/${user.sub}`);
            const userData = userResponse.data;

            await axios.put(`http://localhost:3000/tasks/${taskId}`, {
                name: taskData.name,
                description: taskData.description,
                rewards: parseInt(taskData.rewards),
                status: taskData.status
            });

            alert('Task updated successfully!');
            navigate('/tasks');
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    };

    return (
        <div className="create-task-container">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Name:</label>
                    <input
                        type="text"
                        value={taskData.name}
                        onChange={(e) => setTaskData({...taskData, name: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={taskData.description}
                        onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rewards:</label>
                    <input
                        type="number"
                        value={taskData.rewards}
                        onChange={(e) => setTaskData({...taskData, rewards: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">Update Task</button>
                <button type="button" onClick={() => navigate('/tasks')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditTask;