import { useAuth0 } from "@auth0/auth0-react";
import { useState,useEffect } from "react";
import axios from 'axios';
import './Components.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [profile, setProfile] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
  });
  const [isEditing, setIsEditing] = useState(true);
  useEffect(() => {
    if (isAuthenticated && user) {
        //try to fetch existing profile
        axios.get(`http://localhost:3000/users/auth/${user.sub}`).then((response)=>{
            setProfile(response.data);
            setIsEditing(false);//Existing user,don't show edit form
        }).catch(() =>{
            //if user does not exist, then show fields and pre-fill email and username
            setProfile({
                ...profile,
                userName: user.nickname,
                email:user.email,
        });
        setIsEditing(true);
        });
    }
},[isAuthenticated,user]);
const handleUpdate = async() => {
    try {
        if (profile.userName && profile.email) {
            // First try to create new user
            try {
                const createResponse = await axios.post('http://localhost:3000/users', {
                    auth0Id: user.sub,
                    userName: profile.userName,
                    firstName: profile.firstName || '',
                    lastName: profile.lastName || '',
                    email: profile.email,
                    avatar: profile.avatar || ''    
                });
                setProfile(createResponse.data);
                
                // // Also send signup notification
                // await axios.post('http://localhost:3000/api/signup', {
                //     email: profile.email,
                //     name: profile.userName,
                //     auth0Id: user.sub
                // });
            } catch (createError) {
                if (createError.response?.status === 409) {
                    // User exists, try to update instead
                    const checkUser = await axios.get(`http://localhost:3000/users/auth/${user.sub}`);
                    if (checkUser.data) {
                        const updateResponse = await axios.put(`http://localhost:3000/users/${checkUser.data.id}`, {
                            userName: profile.userName,
                            firstName: profile.firstName || '',
                            lastName: profile.lastName || '',
                            email: profile.email,
                            avatar: profile.avatar || ''    
                        });
                        setProfile(updateResponse.data);
                    }
                } else {
                    throw createError;
                }
            }
            setIsEditing(false);
        } else {
            alert('Username and Email are required!');
        }
    } catch(error) {
        console.error('Error updating profile: ', error.response?.data || error);
        alert(error.response?.data?.error || 'Failed to update profile. Please try again.');
    }
};
if (!isAuthenticated) return null;

return(
    <div className="profile-container">
        <h2>Profile</h2>
        {isEditing ? (
            <div className="profile-form">
                <input
                    value={profile.avatar}
                    type="text"
                    onChange={(e) => setProfile({...profile, avatar: e.target.value})}
                    placeholder="Avatar URL"
                /><input
                    value={profile.userName}
                    type="text"
                    onChange={(e) =>
                        setProfile({ ...profile, userName: e.target.value })
                    }placeholder="Username"
                />
                <input
                    value={profile.firstName}
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setProfile({...profile, firstName:e.target.value})} 
                    />
                    <input
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            placeholder="Last Name"
          />
          <input
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) :(
        <div className="profile-info">
               <div className="avatar-display">
                    <img 
                        src={profile.avatar || 'https://via.placeholder.com/150'} 
                        alt="Profile Avatar"
                        className="profile-avatar"
                    />
                </div>
                <p>Username: {profile.userName}</p>
            <p>First Name: {profile.firstName}</p>
            <p>Last Name: {profile.lastName}</p>
            <p>Email: {profile.email}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
        )}
    </div>
);
};
export default Profile;