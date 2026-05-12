import React from 'react'
import './BuildPc.css'
import { LuWrench } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';



const BuildPc = (path) => {

    const navigate = useNavigate();
   
   
    const handleBtnClick = () => {

        if (path) {
            navigate(path); 
        }

    }

    return (

        <div className='BuildPc-container'>

            <div className="build-container">

                <div className="build-text-content">

                    <h2 className="build-title">Build Your Own PC</h2>

                    <div className="stats-row">
                        <div className="stat-box">
                            <span className="red-label">Best</span>
                            <p>performance</p>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="stat-box">
                            <span className="red-label">Best</span>
                            <p>value</p>
                        </div>
                    </div>

                    <p className="build-desc">
                        don't worry about compatibility. our smart builder
                        ensures every component fits perfectly together.
                        just pick your parts, and we'll do the rest.
                    </p>

                    <button onClick={handleBtnClick} className="build-action-btn">
                        Build Now <LuWrench className="wrench-icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuildPc