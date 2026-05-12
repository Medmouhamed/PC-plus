import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
import { BsCart2 } from "react-icons/bs";


const HeroSection = () => {

    return (

        <div className='Hero-Section-container'>

            <div className="hero-information">

                <div className="hero-pragraph">

                    <div className="hero-title">
                        <p>Everything Your PC
                            Needs. <br />
                            <span>in One Place</span></p>
                    </div>

                    <div className="hero-description">
                        <p>High-performance PC parts for gamers, creators, and power users who demand more speed, stability,
                            and uncompromising reliability from every component in their build.</p>
                    </div>
                </div>
                <div className="hero-btns">

                    <Link className='hero-link hero-shop' to='/Shop'>SHOP NOW<span><BsCart2 className='cart-icon'/></span> </Link>
                    <Link className='hero-link' to='/Login' >Build Your Pc</Link>

                </div>

            </div>

        </div>
    )
}

export default HeroSection