import React,{useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        },1000);
        count === 0 && 
        navigate(`/${path}`,{
            state: location.pathname,
        });
        return () => clearInterval(interval)
    },[count, navigate, location, path])
  return (
    <>
        <div className="spinner" style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <h1 style={{textAlign:"center"}}>redirecting to you in {count} seconds</h1>
        </div>
    </>
  )
}

export default Spinner;
