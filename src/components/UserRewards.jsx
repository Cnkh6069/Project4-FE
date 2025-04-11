import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const UserRewards = () => {
    const [reward, setReward] = useState(0);
    const { user } = useAuth0();

    useEffect(() => {
        const fetchUserRewards = async () => {
            try {
                if (user) {
                    const response = await axios.get(`http://localhost:3000/users/auth/${user.sub}`);
                    setReward(response.data.credits || 0);
                }
            } catch (error) {
                console.error('Error fetching user rewards:', error);
            }
        };

        fetchUserRewards();
    }, [user]);

    return (
        <div className="user-rewards">
            <h3>Your Reward Balance: {reward} points</h3>
        </div>
    );
};

export default UserRewards;