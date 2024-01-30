import React from 'react';
import './menu.css';
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className='box'>
        <h2>Dashboard</h2>
        <ul>
            <NavLink to="/dashboard/user/profile"><li>Profile</li></NavLink>
            <NavLink to="/dashboard/user/orders"><li>Orders</li></NavLink>
        </ul>
    </div>
</>
  )
}

export default UserMenu
