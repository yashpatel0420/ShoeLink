import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <main style={{minHeight: "80vh"}}>
          <Toaster />
          {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout
