
import React, { useState } from 'react'
import './Regester.css'
import '../Login/Login.css'
import RegLog from '../../components/regLogLayout/regLog'
import regImg from '../../assets/signup.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../../Contex/AuthContext';


const Regester = () => {

  const [email, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shown, setShown] = useState(false);

  const { register, loading, error } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await register(name, email, password);
    
    if (result.success) {
     
      navigate('/');
    }
  };

  const handleShow = () => {
    setShown(s => !s);
  }
  
  return (

    <RegLog imgLog={regImg}>

      <div className='Regester-page-container'>

        <h1 className='log-tite'>Sign UP</h1>

        <button className="google-btn">

          <FcGoogle className='google-icon' />
          Sign up with Google
        </button>

        <p className="signup-text reg-txt">Own an Account? <Link to="/Login">Login</Link></p>

        <form onSubmit={handleSubmit}>

          {/* email section */}

          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

          <div className="input-group">
            <label>Email</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@gmail.com" />
          </div>

          {/* username section */}
          <div className="input-group">
            <label>username</label>
            <input required value={name} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="your username" />
          </div>


          {/* password section */}

          <div className="input-group">
            <label>Password</label>

            <input required value={password} onChange={(e) => setPassword(e.target.value)} type={shown ? 'text' : 'password'} placeholder="**************" />

            <span onClick={handleShow} className="toggle-password">

              {
                shown ? <FaRegEye /> : <FaEyeSlash />
              }
            </span>
          </div>

          <button type="submit" className="sign-in-btn reg-page-btn">SIGN Up</button>

          <div className="form-footer reg-page-footer">
            <label className="remember-me">
              <input type="checkbox" defaultChecked required />
              <span className="checkmark"></span>
              I accept the terms & Condition
            </label>
          </div>
        </form>

      </div>

    </RegLog>

  )
}

export default Regester