import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Profile = () => {
  return (
    <Layout>
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <UserMenu />
          </div>
          <div className='adminContent'>
            <h2>Your Profile</h2>
          </div>
      </div>
    </Layout>
  )
}

export default Profile
