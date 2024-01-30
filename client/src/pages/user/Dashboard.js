import React from 'react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/layout/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout> 
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <UserMenu />
          </div>
          <div className='adminContent'>
            <h2>Name: {auth?.user?.name}</h2>
            <h2>Email: {auth?.user?.email}</h2>
            <h2>Contact: {auth?.user?.phone}</h2>
          </div>
      </div>
    </Layout>
  )
}

export default Dashboard