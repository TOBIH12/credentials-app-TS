import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

      useEffect(() => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate("/login");
      }, [])
  return (
    <>
    
    </>
  )
}

export default Logout
