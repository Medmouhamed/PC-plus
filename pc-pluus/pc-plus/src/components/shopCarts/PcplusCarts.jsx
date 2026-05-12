import React, { useEffect, useRef, useState } from 'react'
import './PcplusCarts.css'
import { FaSearch, FaEllipsisH, FaHeart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contex/AuthContext';
import { useCart } from '../../Contex/CartContext';
import { useFavorites } from '../../Contex/FavoriteContext';

const PcplusCarts = ({ product, onProductSelect }) => {


    const [showMenu, setShowMenu] = useState(false);
    const { user } = useAuth(); // جلب حالة المستخدم
    const navigate = useNavigate();
    const menuRef = useRef();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    const { addToCart } = useCart();
    // إغلاق القائمة عند النقر خارجها
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // دالة حماية العمليات (تتطلب تسجيل دخول)
    const handleProtectedAction = (actionType) => {
        if (!user) {
            alert("Please login first");
            navigate('/login');
            return;
        }

        if (actionType === 'cart') {
            addToCart(product);
        } else if (actionType === 'favorite') {
            // التحقق إذا كان موجوداً مسبقاً لحذفه أو إضافته
            if (isFavorite(product._id)) {
                removeFromFavorites(product._id);
                alert("Removed from favorites");
            } else {
                addToFavorites(product); //  الإضافة الفعلية
                alert(`${product.brand} added to favorites!`);
            }
        }
        setShowMenu(false);
    };


    const handleViewProduct = () => {
        if (onProductSelect) {
            onProductSelect(product._id);
            console.log("looooooooolo")
        } else {
            console.error("onProductSelect is not defined!");
        }
        setShowMenu(false);
    };

    return (


        <div className='PcplusCarts-container'>

            <div className="pcplus-cart-header">

                <div className="menu-wrapper" ref={menuRef}>
                    <FaEllipsisH
                        className="header-icon dots-icon"
                        onClick={() => setShowMenu(!showMenu)}
                    />

                    {showMenu && (
                        <div className="dropdown-popup">

                            <div className="dropdown-option" onClick={() => handleProtectedAction('favorite')}>
                                <FaHeart className="option-icon" style={{ color: isFavorite(product._id) ? 'red' : 'inherit' }} />
                                <span>{isFavorite(product._id) ? 'Remove Favorite' : 'Add To Favorite'}</span>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-option" onClick={() => { handleViewProduct() }}>
                                <FaEye className="option-icon" />
                                <span>View Product</span>
                            </div>
                        </div>
                    )}
                </div>


                <span className="store-name">Pc Plus</span>
                <FaSearch className="header-icon search-small" />

            </div>

            <div className="image-pcplusCart-container">
                <img src={product.images}
                    alt={product.brand}
                    className="product-image" />
            </div>

            <div className="product-info">
                <h3 className="product-title"> {product.brand}</h3>
                <p className="product-price"> {Number(product.price).toLocaleString()}DA</p>
            </div>

            <button className="add-to-cart-btn" onClick={() => { handleProtectedAction('cart') }}>
                Add to cart
            </button>

        </div>
    )
}

export default PcplusCarts