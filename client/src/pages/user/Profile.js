import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu.js'
import { useAuth } from '../../context/auth.js'
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const {email, name, address, phone} = auth?.user
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user])

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const {data} = await axios.put("/api/v1/auth/profile",{ 
            name,
            email,
            password,
            phone,
            address,
        });
        if(data?.error){
          toast.error(data?.error)
        }
        else {
          setAuth({...auth, user:data?.updatedUser})
          let ls = localStorage.getItem("auth")
          ls = JSON.parse(ls)
          ls.user = data.updatedUser
          localStorage.setItem('auth', JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
    } catch (error) {
        console.log(error)
        toast.error('Something went wrong');
    }
  };
  
  return (
    <Layout>
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <UserMenu />
          </div>
          <div className='adminContent'>
            <div>
              <div class="admin" id="admin">
                <h1 class="admin_heading">Your <span>Profile</span></h1>
              </div>
              <div className='categoryForm'>
                <form onSubmit={handleSubmit}>
                  <input 
                      style={{marginBottom:'15px'}}
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name.." 
                  />
                  <input 
                      type="email"
                      style={{marginBottom:'15px'}}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email.." 
                      disabled
                  />
                  <input 
                      type="password" 
                      style={{marginBottom:'15px'}}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password.." 
                  />
                  <input 
                      type="text" 
                      style={{marginBottom:'15px'}}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone.." 
                  />
                  <textarea 
                      type="number" 
                      style={{marginBottom:'15px'}}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your address.." 
                  />
                  <input type="submit" value="Update Profile" />
                </form>
              </div>
            </div>
          </div>
      </div> 
    </Layout>
  )
}

export default Profile
