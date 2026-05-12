import React from 'react'
import './CateHomeCarts.css'
import { FaChevronRight } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';



const CateHomeCarts = ({ hardawareImg, title, path }) => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    if (path) {
      navigate(path); 
    }
  };
  return (


    <div
      style={{ '--bg-image': `url(${hardawareImg})` }}
      className='CateHomeCarts-container'
      onClick={handleNavigation}
    >

      <p className='cart-title'>{title}</p>

      <div className="browse-btn">
        Browse <FaChevronRight className='arrow-icon' />
      </div>
    </div>
  )
}

export default CateHomeCarts;