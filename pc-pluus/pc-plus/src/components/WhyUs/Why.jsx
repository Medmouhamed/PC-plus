
import React from 'react'
import CartInfo from '../UI/CartInfo'
import { RiTruckFill } from "react-icons/ri";
import { LuPackageCheck } from "react-icons/lu"; // صندوق مع علامة صح (Lucide)
import './Why.css'
import { MdOutlineSupportAgent } from "react-icons/md";

const Why = () => {

    return (

        <div className='why-us-container'>

            <div className="why-us-all-info">

                <div className="text-info">
                    <h1>Why Choose <span>PC Plus ?</span></h1>
                    <p>We don't just sell hardware, we provide the <br />
                        ecosystem for your ultimate performance.</p>
                </div>

                <div className="cart-info">

                    <CartInfo sideImg={<RiTruckFill className='img-icon' />}
                        title={'Fast Delivery'}
                        subtitle={'Express shipping with shock-proof packaging for sensitive components.'} />

                    <CartInfo sideImg={<LuPackageCheck className='img-icon' />}
                        title={'Official Warranty'}
                        subtitle={'100% Authentic brands..'} />
                    <CartInfo sideImg={<MdOutlineSupportAgent className='img-icon' />}
                        title={'Expert Support'}
                        subtitle={'24/7 technical assistance from certified PC builders..'} />
                </div>

            </div>



        </div>
    )
}

export default Why