import React from 'react'
import './UserAddCarts.css'
import { FaTrash, FaEdit, FaMapMarkerAlt, FaPhoneAlt, FaTag } from 'react-icons/fa';
import nopostImg from '../../assets/nopostImg.png'




const UserAddCarts = ({ posts, onDelete, onEdit }) => {


    const API_URL = "http://localhost:5000";



    const getImagePath = (imagePath) => {
      
        if (Array.isArray(imagePath)) {
            imagePath = imagePath[0];
        }

        
        if (!imagePath || typeof imagePath !== 'string') {
            return nopostImg;
        }

        return imagePath.startsWith('http')
            ? imagePath
            : `${API_URL}${imagePath}`;
    };
    if (!posts) return null;

    return (

        <div className='UserAddCarts-container'>

            <div className="cart-image-box">
                <img
                    src={getImagePath(posts.images)}
                    alt={posts.name}
                    onError={(e) => { e.target.src =  nopostImg ; }}
                />
                <span className="cart-category"><FaTag />{posts.category}</span>
            </div>

            {}
            <div className="cart-details-box">
                <div className="cart-header">
                    <h3>{posts.name}</h3>
                    <div className="cart-actions">
                        <button className="edit-icon-btn" title="Edit" onClick={() => onEdit(posts)}>
                            <FaEdit />
                        </button>
                        <button className="delete-icon-btn" title="Delete" onClick={() => onDelete(posts._id)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>

                <p className="cart-description">
                    <span>descreption :</span> {posts.description}
                </p>

                <div className="cart-meta-info">
                    <span><FaMapMarkerAlt /> {posts.location}</span>
                    <span><FaPhoneAlt /> {posts.phone}</span>
                </div>

                <div className="cart-footer">
                    <div className="cart-price">
                        {Number(posts.price).toLocaleString()}<span> DA</span>
                    </div>
                    <span className="cart-date">
                        {new Date(posts.createdAt).toLocaleDateString('en-GB')}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserAddCarts