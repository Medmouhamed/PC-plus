import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import whiteLogo from '../../assets/white-logo.png'

const Footer = () => {



    return (


        <div className='Footer-container'>

            <div className="Footer-content">
                <div className="top-content">
                    <div className="top-left-content">
                        <div className="footer-logo">
                            <img src={whiteLogo} alt="logo" />
                        </div>
                        <div className="footer-desc">
                            Your trusted destination for building high-performance
                            custom PCs. We combine the latest technology, finest
                            components, and engineering expertise to deliver you
                            an exceptional gaming and working experience.
                        </div>
                    </div>
                    <div className="top-right-content">
                        <div className="links">
                            <ul>
                                <li><Link to="/Contact">Contact Us</Link></li>
                                <li><Link to="/AboutUs">About Us</Link></li>
                            </ul>
                        </div>
                        <div className='social-media-icons'>
                            <ul className="social-list">
                                <li><a href="#"><FaFacebook  className='social-icon'/></a></li>
                                <li><a href="#"><FaTiktok className='social-icon'/></a></li>
                                <li><a href="#"><FaInstagram className='social-icon'/></a></li>
                                <li> <a href="#"><FaTwitter className='social-icon'/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="bottom-content">
                    <div className="policy-container">
                        <p>Privacy policy</p>
                        <p>Terms of services</p>
                    </div>
                    <div className="rights-container">
                        <p>Pc Plus. All rights reserved {new Date().getFullYear()} ©</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer