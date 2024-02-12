import React, { useEffect } from 'react'
import { useAuth } from "../../contexts/AuthContexts";
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate();
const { login,user } = useAuth();
const handleLogin = (e) => {
    e.preventDefault();
    login({ email: 'sjahjksh',password: 'sjahjksh',role:"admin"});
}
useEffect(() => {
  if(user){
    navigate('/');
  }
},[user,navigate])
  return (
    <div>
        <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>'
        </form>
    </div>
  )
}

export default Login