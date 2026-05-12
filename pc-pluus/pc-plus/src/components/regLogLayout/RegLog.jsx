import React from 'react'
import './regLog.css'
import Logo from '../Logo/Logo'





const RegLog = ({ children, imgLog }) => {

    return (

        <div className='regLog-container'>

            <div className="left-reg-log">
                <Logo />
                <p>Shop now<span> quickly, easily </span> and <span> clearly </span>
                    and become one of our community</p>
                <div className="img-reg-log">
                    <img src={imgLog} alt="logImg" />
                </div>
            </div>

            <div className="right-reg-log">
                {children}
            </div>


        </div>
    )
}

export default RegLog;