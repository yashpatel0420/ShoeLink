import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const Users = () => {
  return (
    <Layout>
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <AdminMenu />
          </div>
          <div className='adminContent'>
            <h2>Users</h2>
          </div>
      </div>
    </Layout>
  )
}

export default Users
