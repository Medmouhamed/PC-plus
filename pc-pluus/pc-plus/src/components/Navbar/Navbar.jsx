import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { useAuth } from '../../Contex/AuthContext'

const Navbar = () => {
   
    const { user, logout } = useAuth();

    return (
        <div className='Navbar-container'>
            <Logo />

            <div className="login-btns">
              
                {user ? (
                    <button
                        className='sign-btn logout-btn'
                        onClick={logout}
                    
                    >
                        Logout
                    </button>
                ) : (
                 
                    <>
                        <Link className='sign-btn signup-btn' to='/Regester'>Sign Up</Link>
                        <Link className='sign-btn login-btn' to='/Login'>Login</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;