import React from "react"
import GoogleAuth from '../components/GoogleAuth';

const Header = ({ user, setUser }) => {
  
  return(
    <header className="header">
       <GoogleAuth 
        user={user}
        setUser={setUser}
        />
        <h3>RecipEZY</h3>
    </header>
  )
}


export default Header