import React, { useState } from 'react';
import './UserProfile.css';
import { useAuth } from '../../Contex/AuthContext';
import { useFavorites } from '../../Contex/FavoriteContext';
import { FaUser, FaStar, FaCog, FaSearch, FaRegTrashAlt,FaSignOutAlt } from 'react-icons/fa';

const UserPage = () => {

    const { user, logout } = useAuth();
    const { favorites, loading, removeFromFavorites } = useFavorites();
    const [activeTab, setActiveTab] = useState('profile');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    });

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Updating profile:", formData);
        alert("Changes saved successfully!");
    };


    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            console.log("Deleting account for:", user?.email);
            //  Api in futer 
            alert("Account deletion request sent.");
        }
    };

    return (
        <div className="user-page-container">
            {/* Sidebar الجانبي */}
            <aside className="user-sidebar">
                <div className="user-info-brief">
                    <div className="avatar-circle">
                        <FaUser />
                    </div>
                    <h3>{user?.name || 'User'}</h3>
                    <p className="user-email-small">{user?.email}</p>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaUser className="nav-icon" /> Profile
                    </button>
                    <button
                        className={activeTab === 'favorite' ? 'active' : ''}
                        onClick={() => setActiveTab('favorite')}
                    >
                        <FaStar className="nav-icon" /> Favorite
                    </button>
                    <button
                        className={activeTab === 'settings' ? 'active' : ''}
                        onClick={() => setActiveTab('settings')}
                    >
                        <FaCog className="nav-icon" /> Settings
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="contact-box">
                        <p>Any Problem?</p>
                        <button onClick={() => window.location.href = '/contact'}>Contact us</button>
                    </div>
                    <button className="logout-btn" onClick={logout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content المحتوى الأساسي */}
            <main className="user-main-content">
                <div className="header-actions">
                    <h2>Hello, {user?.name?.split(' ')[0] || 'User'}</h2>
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search in your account" />
                    </div>
                </div>

                <hr className="divider" />

                {/* تبويب الملف الشخصي */}
                {activeTab === 'profile' && (
                    <div className="profile-section">
                        <form className="profile-form" onSubmit={handleUpdateProfile}>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Confirm Password:</label>
                                    <input
                                        type="password"
                                        placeholder="****************"
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Email:</label>
                                    <input type="email" value={formData.email} readOnly />
                                </div>
                                <div className="input-group">
                                    <label>Change Password:</label>
                                    <input
                                        type="password"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-footer">
                                <button type="submit" className="save-btn">Save Edits 💾</button>
                                <button type="button" className="close-btn" onClick={() => window.history.back()}>Close</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* تبويب المفضلة */}
                {activeTab === 'favorite' && (
                    <div className="favorites-section">

                        <div className="fav-header">
                            <span className="fav-title-text">Your Favorites List</span>
                            <span className="fav-count">{favorites.length} Products Found</span>
                        </div>

                        <div className="favorites-scroll-area">
                            {loading ? (
                                <div className="loader">Loading favorites...</div>
                            ) : favorites.length > 0 ? (
                                favorites.map((product) => (
                                    <div key={product._id} className="fav-item-card">
                                        <div className="fav-img-container">
                                            <img
                                                src={product.displayImage || '/assets/nopostImg.png'}
                                                alt={product.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/assets/nopostImg.png';
                                                }}
                                            />
                                        </div>

                                        <div className="fav-details">
                                            <span className="owner-badge">
                                                {product.owner ? `User: ${product.owner.name}` : "Store: Pc Plus"}
                                            </span>
                                            <h4>{product.brand || product.name}</h4>
                                            <p className="fav-price">PRICE: {Number(product.price).toLocaleString()} DA</p>
                                        </div>

                                        <div className="fav-actions">

                                            <button
                                                className="remove-fav-btn"
                                                onClick={() => removeFromFavorites(product._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-favorites">
                                    <FaStar size={50} color="#333" />
                                    <p>Your favorites list is currently empty.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="settings-section">
                        <div className="settings-card">
                            <button className="settings-logout-btn" onClick={logout}>
                                Log out From Your Account <FaSignOutAlt />
                            </button>
                        </div>

                        <div className="delete-account-container">
                            <p className="delete-warning-text">Are You Want To Delete Your Account ?</p>
                            <button className="delete-account-btn" onClick={handleDeleteAccount}>
                                Delete Account <FaRegTrashAlt />
                            </button>
                        </div>

                        <div className="settings-footer">
                            <button className="close-dashboard-btn" onClick={() => window.history.back()}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserPage;