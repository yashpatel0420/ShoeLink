import React,{useState} from 'react'
import Layout from '../../components/layout/Layout.js';
import axios from 'axios';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/api/v1/auth/login",{ 
                email,
                password,
            });
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || '/');
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }
    };
  return (
    <Layout>
        <section className="register-splash">
            <h1 data-text="Login Yourself">Login Yourself</h1>
        </section>
        <div className='registerForm'>
            <form onSubmit={handleSubmit}>

                <label>Email</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email.." 
                    required
                />

                <label>Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password.." 
                    required
                />
            
                <input type="submit" value="Login" />
                <p>Don't have an account? <NavLink to={"/register"}>Register from here.</NavLink></p>
                <p><NavLink to={"/forgot-password"}>Forgot your password?</NavLink></p>
            </form>
        </div>
    </Layout>
  )
}

export default Login