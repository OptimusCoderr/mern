import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth()
    if(currentUser){
        return children;
    }
    alert("Login to Continue")
  return <Navigate to = "/login" replace/>
}

export default PrivateRoute