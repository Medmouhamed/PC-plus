
import React from 'react'

import './Cartinfo.css'

const CartInfo = ({ sideImg, title, subtitle }) => {
    return (
        
        <div className='CartInfo-container'>

            <div className="img-info-cont">

                <div className="img-cont">
                    {sideImg}
                </div>

                <div className="cart-info-cont">
                    <h2 className='cart-info-title'>{title}</h2>
                    <p className='cart-info-subtitle'>{subtitle}</p>
                </div>


            </div>


        </div>
    )
}

export default CartInfo