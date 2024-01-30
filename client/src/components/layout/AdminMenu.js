import React from 'react';
import './menu.css';
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
        <div className='box'>
            <h2>Admin Panel</h2>
            <ul>
                <NavLink to="/dashboard/admin/create-category"><li>Create Category</li></NavLink>
                <NavLink to="/dashboard/admin/create-product"><li>Create Product</li></NavLink>
                <NavLink to="/dashboard/admin/products"><li>Products</li></NavLink>
                <NavLink to="/dashboard/admin/users"><li>Users</li></NavLink>
            </ul>
        </div>
    </>
  )
}

export default AdminMenu
