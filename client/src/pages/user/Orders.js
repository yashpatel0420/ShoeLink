import React from 'react'
import UserMenu from '../../components/layout/UserMenu';
import Layout from "../../components/layout/Layout";

const Orders = () => {
  return (
    <Layout>
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <UserMenu />
          </div>
          <div className='adminContent'>
            <h2>All Orders</h2>
          </div>
      </div>
    </Layout>
  )
}

export default Orders
