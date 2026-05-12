import React from 'react'
import './Partners.css'
import {
    SiSamsung,
    SiNvidia,
    SiIntel,
    SiAsus,
    SiAmd,
    SiMsi,
    SiCorsair,
    SiKingstontechnology
} from "react-icons/si";

const partnersIcons = [
    { icon: <SiSamsung />, name: "Samsung" },
    { icon: <SiNvidia />, name: "Nvidia" },
    { icon: <SiCorsair />, name: "Corsair" },
    { icon: <SiMsi />, name: "MSI" },
    { icon: <SiKingstontechnology />, name: "Kingston" },
    { icon: <SiIntel />, name: "Intel" },
    { icon: <SiAsus />, name: "Asus" },
    { icon: <SiAmd />, name: "AMD" }
];


const Partners = () => {
    return (

        <div className='Partners-container'>

            <h2 className="partners-title">Official Partners</h2>

            <div className="slider-container">
                <div className="slider-track">
                    {[...partnersIcons, ...partnersIcons].map((partner, index) => (
                        
                        <div className="partner-item" key={index}>
                            <div className="icon-wrapper">
                                {partner.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Partners;