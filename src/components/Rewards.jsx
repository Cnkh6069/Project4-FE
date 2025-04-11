import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import './Components.css'

const Rewards = () => {
    const [rewards, setRewards] = useState([]);
    const {user} = useAuth0();

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

const handleRedeemReward = async (reward) => {
    try {
        // Get user's current credit balance first
        const userResponse = await axios.get(
            `http://localhost:3000/users/auth/${encodeURIComponent(user.sub)}`
        );
        const userData = userResponse.data;

        // Check if user has enough credits
        if (userData.credits < reward.creditRequired) {
            alert('Insufficient credits to redeem this reward.');
            return;
        }

        // Update user's credits
        await axios.put(`http://localhost:3000/users/auth/${encodeURIComponent(user.sub)}`, {
            credits: userData.credits - reward.creditRequired
        });

        // Create transaction record
        await axios.post(`http://localhost:3000/transactions`, {
            sender_id: user.sub,
            receiver_id: "SYSTEM",
            amount: reward.creditRequired,
            transaction_type: "REWARD_REDEMPTION",
            description: `Redemption of reward: ${reward.name}`
        });

        // Create redemption record
        await axios.post(`http://localhost:3000/redemptions`, {
            userId: user.sub,
            rewardId: reward.id,
            status: "PENDING"
        });

        alert(`Reward redeemed successfully! Check your email for details.`);
    } catch (error) {
        console.error('Error redeeming reward:', error);
        alert('Failed to redeem reward. Please try again.');
    }
};
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
                   <button onClick={()=>handleRedeemReward(reward)}>Redeem</button> </div>))}
                    </div>
                    </div> )
}

            export default Rewards;        
              