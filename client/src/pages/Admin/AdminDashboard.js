import React from 'react';
import Layout from "./../../components/layout/Layout";
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout> 
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <AdminMenu />
          </div>
          <div className='adminContent'>
            <h2>Admin name: {auth?.user?.name}</h2>
            <h2>Admin Email: {auth?.user?.email}</h2>
            <h2>Admin Contact: {auth?.user?.phone}</h2>
          </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
