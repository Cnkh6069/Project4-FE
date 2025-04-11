import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import AuthButtons from './components/AuthButton'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Rewards from './components/Rewards'
import AllTasks from './components/AllTasks'
import MyTasks from './components/MyTasks'
import CreateTask from './components/CreateTask'
import EditTask from './components/EditTask'


function App() {
  const { isAuthenticated } = useAuth0()

  return (
    <Router>
    <div className="app-container">
      <div className="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz1If13MbDOQumsT6ZMegTQUIqCGDjgyuho6Wmhtv4WXv3fiDyjwibGWnaUl9iOXZwOc&usqp=CAU" className="logo" />
        <h1>SG Guild Board</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz1If13MbDOQumsT6ZMegTQUIqCGDjgyuho6Wmhtv4WXv3fiDyjwibGWnaUl9iOXZwOc&usqp=CAU" className="logo" />
        
      </div>
      <div><AuthButtons/></div>

      {isAuthenticated && (
        <>
        <Navbar/>
        <div className="content">
          <Routes>
<Route path="/" element={<Profile />} />
<Route path="/rewards" element={<Rewards />} />
<Route path="/tasks">
  <Route index element={<AllTasks/>} />
  <Route path="create" element={<CreateTask />}/>
  <Route path="/tasks/edit/:taskId" element={<EditTask />} />
  <Route path="my-tasks" element={<MyTasks />} />
</Route>

</Routes>
          </div>
        </>
      )}
    </div>
  </Router>
)
}

export default App

