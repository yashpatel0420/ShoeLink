import React,{useState} from 'react'
import Layout from '../../components/layout/Layout.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/api/v1/auth/forgot-password",{ 
                email,
                newPassword,
                answer
            });
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login');
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
        <div className='registerForm'>
            <h1 className='resetPassword'>Reset Password</h1>
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
                    id="newPassword" 
                    name="newPassword" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Your password.." 
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
            </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword
