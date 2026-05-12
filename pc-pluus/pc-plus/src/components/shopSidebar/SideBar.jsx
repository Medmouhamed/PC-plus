import React from 'react'
import './SideBar.css'
import { FaFilter } from 'react-icons/fa';

const SideBar = () => {


    return (

        <div className='Shop-SideBar-container'>
            <div className="sidebar-header">
                <FaFilter className="filter-icon" />
            </div>

           
            <div className="filter-group">
                <h3 className="filter-title">PRICE</h3>
                <ul className="filter-list">
                    <li className="active">All</li>
                    <li>0 to 10,000 DA</li>
                    <li>10,000 to 20,000 DA</li>
                    <li>20,000 to 40,000 DA</li>
                    <li>40,000 to 80,000 DA</li>
                </ul>
            </div>

            
            <div className="filter-group">
                <h3 className="filter-title">BRAND</h3>
                <div className="brand-select-wrapper">
                    <select className="brand-select">
                        <option>All brands</option>
                        <option>Asus</option>
                        <option>MSI</option>
                        <option>Gigabyte</option>
                        <option>Intel</option>
                        <option>Amd</option>

                    </select>
                </div>
            </div>

        
            <div className="filter-group">
                <h3 className="filter-title">SORT BY</h3>
                <ul className="filter-list">
                    <li className='active'>All</li>
                    <li>Low to High</li>
                    <li>High to Low</li>
                    <li>Newness</li>
                </ul>
            </div>

        </div>
    )
}

export default SideBar