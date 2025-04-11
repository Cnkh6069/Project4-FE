import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import UserRewards from './UserRewards';

const Navbar = () => {
  return (
    <nav className="navbar">
      <UserRewards/>
      <ul>
        <li><Link to="/">Profile</Link></li>
        <li><Link to="/rewards">Rewards</Link></li>
        <li><Link to="/tasks">Guild Board</Link></li>
        <li><Link to="/tasks/my-tasks">My Tasks</Link></li>
        <li><Link to="/tasks/create">Submit Request</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;