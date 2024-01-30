import React,{useState} from 'react'
import Layout from '../../components/layout/Layout.js';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/api/v1/auth/register",{ 
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate('/login')
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
            <h1 data-text="Register Yourself">Register Yourself</h1>
        </section>
        <div className='registerForm'>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name.." 
                    required
                />

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

                <label>Phone</label>
                <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone.." 
                    required
                />

                <label>Address</label>
                <textarea 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Your address.." 
                    required
                />
            
                <label>Your Best Friend Name</label>
                <input 
                    type="text" 
                    id="answer" 
                    name="answer" 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Your answer.." 
                    required
                />

                <input type="submit" value="Submit" />
                <p>Already registered? <NavLink to={"/login"}><a>Login from here.</a></NavLink></p>
            </form>
        </div>
    </Layout>
  )
}

export default Register