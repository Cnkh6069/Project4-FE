import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import './Components.css'
const Rewards = () => {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try{
                const response  = await axios.get('http://localhost:3000/rewards');
                setRewards(response.data.data || response.data);
            }catch(error){
                console.error('Error fetching rewards:', error);
            }
        };
        fetchRewards();
}, []);
    return (
        <div className="rewards-container">
            <h2>Available Rewards</h2>
            <div className="rewards-grid">
                {rewards.map((reward) => (
                    <div key = {reward.id} className="reward-card">
                         <div className="reward-image">
                            <img 
                                src={reward.imgsrc || 'https://via.placeholder.com/150'} 
                                alt={reward.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/150';
                                }}
                            />
                        </div>
                        <div className="content">
                        <h3>{reward.name}</h3>
                        <p>{reward.description}</p>
                        <p>Cost: {reward.creditRequired} points</p>
                   </div>
                   <button>Redeem</button> </div>))}
                    </div>
                    </div> )
}

            export default Rewards;        
              