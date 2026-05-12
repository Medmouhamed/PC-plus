// pages/Cart/CartPage.jsx
import React from 'react';
import './Cartpage.css';
import { useCart } from '../../Contex/CartContext';

import { FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';

const Cartpage = () => {

    const { cartItems, removeFromCart, updateQuantity, fetchCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.productId?.price || 0;
        return acc + (price * item.quantity);
    }, 0);


    return (
        <div className="cart-page-wrapper">
            <div className="cart-nav-info">
                <FaArrowLeft className="back-btn" onClick={() => window.history.back()} />
                <span>Pc Plus Products \ Your Cart</span>
            </div>

            <h1 className="main-cart-title">YOUR CART</h1>

            <div className="cart-layout">
                {/* قائمة المنتجات */}
                <div className="items-list">
                    {cartItems.map((item) => {
                        // تعريف المنتج لتسهيل الوصول إليه
                        const p = item.product;

                        if (!p) return null;

                        return (
                          
                            <div key={item._id} className="cart-item-row">
                                <button className="del-btn" onClick={() => removeFromCart(p._id)}>✕</button>

                                <img
                                    src={p.images?.[0]?.startsWith('http')
                                        ? p.images[0]
                                        : `http://localhost:5000${p.images?.[0] || p.imageUrl || ''}`}
                                    alt={p.name || p.brand}
                                />

                                <div className="item-details">
                                   
                                    <span className={`badge ${p.owner ? 'user-badge' : 'admin-badge'}`}>
                                        {p.owner?.name || "Pc Plus"}
                                    </span>
                                   
                                    <h3>{p.brand || p.name}</h3>
                                </div>

                                <div className="qty-box">
                                    <button onClick={() => updateQuantity(p._id, item.quantity - 1)}><FaMinus /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(p._id, item.quantity + 1)}><FaPlus /></button>
                                </div>
                                <div className="price-display">
                                    {(p.price * item.quantity).toLocaleString()} DA
                                </div>
                            </div>
                        );
                    })}

                    <div className="update-trigger" onClick={fetchCart}>
                        <span className="refresh-icon">↻</span> UPDATE CART
                    </div>
                </div>

                {/* proccec payment */}
                <div className="totals-sidebar">
                    <h2>CART TOTALS</h2>
                    <div className="calc-row"><span>Shipping (3 To 5 Days)</span><span>Free</span></div>
                    <div className="calc-row"><span>Tax</span><span>0 DA</span></div>
                    <div className="calc-row"><span>Subtotal</span><span>{subtotal.toLocaleString()} DA</span></div>
                    <hr />
                    <div className="final-total">
                        <span>TOTAL</span>
                        <span>{subtotal.toLocaleString()} DA</span>
                    </div>
                    <button className="checkout-action">PROCESSED TO CHECKOUT</button>
                    <div className="back-to-shop">‹ CONTINUE SHOPPING</div>
                </div>
            </div>
        </div>
    );
};
export default Cartpage;