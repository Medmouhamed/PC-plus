import React from 'react'
import './shopHeader.css'
import { FaSearch, FaUserCircle, FaShoppingBag, FaHome, FaUsers, FaUserCog } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../Contex/CartContext';



const ShopHeader = ({ activeTab, setActiveTab, user }) => {

    const location = useLocation();

    const { cartItems } = useCart();

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const isPcPlusActive = activeTab === 'pc-plus' || location.pathname.includes('ProductDetails');

    return (

        <header className="main-header">

            <div className="top-top-header">

                <p>The official Algerian store for buying and selling PC parts</p>
                <ul>
                    <li><Link to='#about'>about pc plus</Link></li>
                    <li><Link>location</Link></li>
                    <li><Link>contact us</Link></li>
                </ul>

            </div>

            <div className="top-header">
                <div className="logo-section">
                    <Link to='/'><img src={logo} alt="Pc Plus Logo" className="logo" /></Link>

                </div>

                <div className="search-bar-container">
                    <div className="search-input-wrapper">
                        <input type="text" placeholder="Search" />
                        <div className="category-divider">

                            <select className="category-select">
                                <option>All Categories</option>
                                <option>GPUs</option>
                                <option>CPUs</option>
                                <option>Motherboards</option>
                                <option>RAMs</option>
                                <option>SSDs/HDDs</option>
                                <option>PSU</option>
                                <option>Monotors</option>
                                <option>Cases</option>
                                <option>Accessories</option>
                            </select>
                        </div>
                        <button className="search-btn"><FaSearch /></button>
                    </div>
                </div>

                <div className="user-actions">
                    <div className="auth-status">
                        <span className="login-link">
                            {user ? (user.name || user.username) : <Link to='/Login'>Login</Link>}
                        </span>
                        {user ? <Link to='/UserProfile'><FaUserCircle className="icon user-icon" /></Link> : ''}
                    </div>
                    <div className="cart-status">

                        <Link to="/Cart" style={{ color: 'inherit' }}>
                            <FaShoppingBag className="icon" />
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </Link>

                    </div>
                </div>
            </div>

            <nav className="tabs-nav">

                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'pc-plus' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pc-plus')}
                    >
                        Pc Plus Products <FaHome />
                    </button>

                    <button
                        className={`tab-btn ${activeTab === 'community' ? 'active' : ''}`}
                        onClick={() => setActiveTab('community')}
                    >
                        Community <FaUsers />
                    </button>

                    <button
                        className={`tab-btn ${activeTab === 'user-products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('user-products')}
                    >
                        User Products <FaUserCog />
                    </button>
                </div>
            </nav>
        </header>


    )
}

export default ShopHeader