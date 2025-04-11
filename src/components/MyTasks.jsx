import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";



const MyTasks = () => {
    const [mytasks, setMyTasks] = useState([]);
    const {user} = useAuth0();
    useEffect(() => {
        const fetchMyTasks = async () => {
            try {
                if (!user) return;
                
                const response = await axios.get("http://localhost:3000/tasks");
                const allTasks = response.data.data || response.data;
                const userTasks = allTasks.filter(task => task.acceptorId === user.sub);
                setMyTasks(userTasks);
            } catch (error) {
                console.error('Error fetching my tasks:', error);
            }
        };
    
        fetchMyTasks();
    }, [user]);

    const handleCompleteTask = async (taskId) => {
        try {
            // Get task details
        const task = mytasks.find(t => t.id === taskId);
        if (!task) {
            alert('Task not found');
            return;
        }

        // Create transaction record and update credits
        await axios.post(`http://localhost:3000/transactions`, {
            taskId: taskId,
            acceptorId: user.sub,
            requestorId: task.requestorId,
            amount: task.rewards,
            transactiontype: "TASK_COMPLETION",
            description: `Task completion reward for task: ${task.name}`
        });

        //update task status

            await axios.put(`http://localhost:3000/tasks/${taskId}`, {
                status: "Completed"
            });
            
        //refresh tasks list
            const response = await axios.get("http://localhost:3000/tasks");
            const allTasks = response.data.data || response.data;
            const userTasks = allTasks.filter(task => task.acceptorId === user.sub);

            setMyTasks(userTasks);
            alert(`Task marked as completed! You earned ${task.rewards} points!`);
        } catch (error) {
            console.error('Error completing task:', error);
            alert('Failed to mark task as completed. Please try again.');
        }
    }

    return (
        <div className="my-tasks-container">
            <h2>My Tasks</h2>
            <div className="tasks-grid">
                {mytasks.map((task) => (
                    <div key={task.id} className="task-card">
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>Rewards: {task.rewards} points</p>
                        <p>Status: {task.status}</p>
                        {task.status === "In Progress" && task.acceptorId === user?.sub && (
                            <button onClick={() => handleCompleteTask(task.id)}>
                                Complete Task
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MyTasks;