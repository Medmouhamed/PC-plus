import React, { useState } from 'react'
import './CommunityCards.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../../Contex/AuthContext'
import noPostImg from '../../assets/nopostImg.png'
import { useCart } from '../../Contex/CartContext';
import { useFavorites } from '../../Contex/FavoriteContext';


const CommunityCards = ({ posts }) => {


    const { user } = useAuth();
    const { addToCart } = useCart();

    const API_URL = "http://localhost:5000";

    const handleAddToCart = () => {
        if (!user) {
            alert("Please login first!");
            return;
        }
        addToCart(posts);
        alert("Added to cart (UI only for now)!");
    };

    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite(posts._id)) {
            removeFromFavorites(posts._id);
        } else {
            // نمرر الكائن كاملاً لتقوم دالة addToFavorites بمعالجته
            addToFavorites(posts);
        }
    };

    const getImagePath = (imagePath) => {

        let path = Array.isArray(imagePath) ? imagePath[0] : imagePath;


        if (!path || path === "null" || typeof path !== 'string') {
            return noPostImg;
        }


        if (path.startsWith('http')) return path;

        return `${API_URL}${path}`;
    };

    const displayImage = getImagePath(posts.images);




    return (

        <div className='CommunityCards-container'>

            <div className="card-top-actions" onClick={handleToggleFavorite}>
                {isFavorite(posts._id) ? (
                    <FaHeart className="heart-icon active" style={{ color: 'red' }} />
                ) : (
                    <FaRegHeart className="heart-icon" style={{ color: '#888' }} />
                )}
            </div>

            <div className="card-main-layout">

                <div className="image-wrapper">
                    <img src={displayImage}
                        alt={posts.name}
                        onError={(e) => { e.target.src = noPostImg; }} />
                </div>

                <div className="info-wrapper">

                    <h2 className="user-name-title">
                       
                        {posts.owner?.name || posts.owner?.email || "Member"}

                        {user && (user.email === posts.owner?.email || user._id === posts.owner?._id) && (
                            <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '5px' }}>(You)</span>
                        )}
                    </h2>
                    <p className="product-sub-title">{posts.name}</p>

                    <div className="desc-container">
                        <span className="desc-label">Description :</span>
                        <p className="desc-content">
                            {
                                posts.description
                            }
                        </p>
                    </div>

                    <div className="price-row">
                        <span className="price-label">Location :</span>
                        <span className="price-amount">{posts.location}</span>
                    </div>

                    <div className="price-row">
                        <span className="price-label">phone :</span>
                        <span className="price-amount">{posts.phone}</span>
                    </div>

                    <div className="price-row">
                        <span className="price-label">Price :</span>
                        <span className="price-amount">{Number(posts.price).toLocaleString()}DA</span>
                    </div>
                    <button className="cta-button"
                        onClick={handleAddToCart}
                    >
                        Add to cart

                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommunityCards