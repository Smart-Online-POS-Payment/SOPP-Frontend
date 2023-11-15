import {React, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from '../../cookie-functions';

const MainScreen = () => {

    const navigate = useNavigate();
        useEffect(() => {
            if(!getCookie('sopp-auth')){    
                navigate("/login");
            }
        },[])

    const handleLogout = () => {            
        deleteCookie('sopp-auth')
        navigate("/login");
        window.location.reload();
      };


  return (
    <div className="main-screen">
      <h1>Main Screen</h1>      
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default MainScreen;
