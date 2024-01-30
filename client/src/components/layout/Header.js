import React from 'react';
import "./header.css";
import logo from '../image/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';

const Header = () => {
  const [auth,setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth, 
      user:null,
      token:"",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div>
      <header className='header'>
          <NavLink to="/"><img className='logo' src={logo} alt=''/></NavLink>
            <div className='navbar'>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/product">Product</NavLink>
              <NavLink to="contact">Contact Us</NavLink>
            </div>
          <div className="icons">
              <Badge badgeContent={4} color="primary">
                <NavLink to="/cart"><i><ShoppingCartIcon id="icon" /></i></NavLink>
              </Badge>
              {
                !auth.user ? (<>
                  <NavLink to="/login"><i className='tag'>LOGIN</i></NavLink>
                </>) : (<>
                  <div className="dropdown">
                    <button className="dropbtn">
                      {auth?.user?.name}
                    </button>
                    <div className="dropdown-content">
                      <NavLink to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}>Dashboard</NavLink>
                      <NavLink onClick={handleLogout} to="/login"><i>Logout</i></NavLink>
                    </div>
                  </div>
                </>)
              }
          </div>
      </header>
    </div>

  )
}

export default Header