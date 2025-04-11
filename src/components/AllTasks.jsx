import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import "./Components.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const { user } = useAuth0();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        // Ensure we always have an array
        const tasksData = response.data?.data || response.data || [];
        setTasks(tasksData);

        //Fetch user details
        const uniqueRequestors = [
          ...new Set(tasksData.map((task) => task.requestorId)),
        ];
        const userDetails = {};

        for (const requestorId of uniqueRequestors) {
          try {
            const encodedAuth0Id = encodeURIComponent(requestorId);
            const userResponse = await axios.get(
              `http://localhost:3000/users/auth/${encodedAuth0Id}`
            );
            userDetails[requestorId] = userResponse.data;
          } catch (userError) {
            console.error(`Error fetching user ${requestorId}:`, userError);
            userDetails[requestorId] = { firstName: 'Unknown User' };
          }
        }
        setUsers(userDetails);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Set empty array if fetch fails
      }
    };
    fetchTasks();
  }, []);

  const handleAcceptTask = async (taskId) => {
    try {
      const userResponse = await axios.get(
        `http://localhost:3000/users/auth/${encodeURIComponent(user.sub)}`
      );
      const userData = userResponse.data;

      const task = tasks.find((t) => t.id === taskId);
      if (task.requestorId === user.sub) {
        alert("You cannot accept your own task.");
        return;
      }
console.log(user.sub)
    // Update task with auth0Id and status
    await axios.put(`http://localhost:3000/tasks/${taskId}`, {
      status: "In Progress",
      acceptorId: user.sub,  // Using auth0Id instead of database ID
      acceptorName: userData.firstName // Adding acceptor's username
  });
      // Refresh tasks list
      const updatedTasks = await axios.get("http://localhost:3000/tasks");
      setTasks(updatedTasks.data.data || updatedTasks.data);
      alert("Task accepted successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error accepting task:", error);
      alert("Failed to accept task. Please try again.");
    }
  };
  const handleEditTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      navigate(`/tasks/edit/${taskId}`, { state: { task } });
    } catch (error) {
      console.error("Error navigating to edit task:", error);
    }
  };

  return (
    <div className="tasks-container">
        <h2>Guild Notice Board</h2>
        <div className="task-grid">
            {Array.isArray(tasks) && tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <p>Rewards: {task.rewards} points</p>
                    <p>Status: {task.status}</p>
                    <p>Posted By: {users[task.requestorId]?.firstName || "Unknown"}</p>
                    {task.status === "Open" && task.requestorId === user?.sub && (
                        <button onClick={() => handleEditTask(task.id)}>Edit Task</button>
                    )}
                    {task.status === "Open" && user?.sub !== task.requestorId && (
                        <button onClick={() => handleAcceptTask(task.id)}>Accept Task</button>
                    )}
                </div>
            ))}
        </div>
    </div>
);}
export default AllTasks;
