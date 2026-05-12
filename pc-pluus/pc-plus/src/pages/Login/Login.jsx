import React, { useState } from 'react'
import './Login.css'
import RegLog from '../../components/regLogLayout/regLog'
import imgLog from '../../assets/Signin.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../../Contex/AuthContext'


const Login = () => {


  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shown, setShown] = useState(false);


  const { login, loading, error } = useAuth();

  const navigate = useNavigate();

  const handleShow = () => setShown(s => !s);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {

      navigate('/Shop');
    }
  };

  return (

    <RegLog imgLog={imgLog}>

      <h1 className='log-tite'>Sign in</h1>

      <form onSubmit={handleSubmit} >
        {/* email section */}

        {error && <p className="error-message" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@gmail.com"  required/>
        </div>
        {/* password section */}
        <div className="input-group">
          <label>Password</label>

          <input value={password} onChange={(e) => setPassword(e.target.value)} type={shown ? 'text' : 'password'} placeholder="**************" required/>

          <span onClick={handleShow} className="toggle-password">

            {
              shown ? <FaRegEye /> : <FaEyeSlash />
            }
          </span>
        </div>

        <button type="submit" className="sign-in-btn">SIGN IN</button>

        <div className="form-footer">
          <label className="remember-me">
            <input type="checkbox" defaultChecked />
            <span className="checkmark"></span>
            Remember me
          </label>
          <Link to='#' className="forgot-pass">forgot password ?</Link>
        </div>
      </form>

      <div className="divider">
        <span>Pc Plus</span>
      </div>

      <button className="google-btn">
        <FcGoogle className='google-icon' />
        Sign up with Google
      </button>

      <p className="signup-text">Don’t have an account? <Link to="/Regester">Sign up</Link></p>

    </RegLog>

  )
}

export default Login