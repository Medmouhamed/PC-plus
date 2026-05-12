import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaStar, FaRegStar, FaHeart } from 'react-icons/fa';
import './ProductDetails.css';
import { useAuth } from '../../Contex/AuthContext'


const ProductDetails = ({ id, onBack }) => {



    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info'); 
    const [reviews, setReviews] = useState([]);
    const [specs, setSpecs] = useState(null);

    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState("");


    const { user } = useAuth();

    useEffect(() => {

        const fetchAllData = async () => {

            setLoading(true)
            try {
                // جلب بيانات المنتج الأساسية من الباك آند

                const prodRes = await fetch(`http://localhost:5000/api/products/${id}`);
                const prodData = await prodRes.json();
                setProduct(prodData);

                const categoryPath = prodData.category.toLowerCase();
                const specsRes = await fetch(`http://localhost:5000/api/${categoryPath}/${id}`);

                if (specsRes.ok) {
                    const specsData = await specsRes.json();
                    setSpecs(specsData);
                }

                const reviewsRes = await fetch(`http://localhost:5000/api/reviews/${id}`);

                if (reviewsRes.ok) {
                    const reviewsData = await reviewsRes.json();
                    setReviews(reviewsData);
                }

            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchAllData();
    }, [id]);


    const handleReviewSubmit = async (e) => {

        e.preventDefault();

        if (!user) return alert("Please login to write a review!");
        if (userRating === 0) return alert("Please select a rating!");

        try {
            const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // for cookies
                body: JSON.stringify({
                    rating: userRating,
                    comment: userComment
                })
            });

            const data = await response.json();

            if (response.ok) {


                const populatedReview = {
                    ...data, // نأخذ الـ ID والبيانات القادمة من السيرفر
                    user: {
                        name: user.name,  // نضع الاسم من الـ Context لضمان ظهوره
                        email: user.email
                    },
                    createdAt: new Date().toISOString()
                };

                setReviews(prev => [populatedReview, ...prev]);

                alert("Review submitted!");
                setUserComment("");
                setUserRating(0);

            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    if (loading) return <div className="loading-details">Loading product details...</div>;
    if (!product) return <div className="error-details">Product not found!</div>;


    const renderSpecs = () => {

        if (!specs) return <p>No details available for this product</p>;

        //   without this data 
        const excludedFields = ['_id', 'productId', '__v', 'createdAt', 'updatedAt'];

        return (
            <div className="specs-container">
                {Object.entries(specs)
                    .filter(([key]) => !excludedFields.includes(key))
                    .map(([key, value]) => (
                        <div className="spec-item" key={key}>
                            <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                            <span className="spec-value">{value.toString()}</span>
                        </div>
                    ))}
            </div>
        );
    };
    return (

        <div className="product-details-content">

            <div className="back-link" onClick={onBack}><FaArrowLeft /><span>Back to Shop</span></div>

            <div className="main-details-section">

                <div className="product-image-box">
                    <img src={product.imageUrl} alt={product.brand} />
                </div>

                <div className="product-price-info">

                    <h1>{product.brand} {product.model}</h1>

                    <div className="price-box">
                        <span className="price-label">Price:</span>
                        <span className="price-amount">{Number(product.price).toLocaleString()} DA</span>
                    </div>

                    <p className="category-info">Category: {product.category}</p>

                    <div className="quantity-selector">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>

                    <button className="favorite-btn">Add to favorite <FaHeart /> </button>
                    <button className="add-to-cart-btn">Add to cart</button>

                </div>
            </div>

            <div className="details-tabs">
                <button className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>Informations</button>
                <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews ({reviews.length})</button>
            </div>

            <div className="tab-panel">

                {activeTab === 'info' ? renderSpecs() : (

                    <div className="reviews-container-grid">
                        {/* القائمة اليسرى للتعليقات */}
                        <div className="reviews-list">
                            {reviews.length > 0 ? reviews.map(rev => (
                                <div key={rev._id} className="review-card-item">
                                    <div className="review-user-info">
                                        <span className="user-name">{rev.user?.name || 'User'}</span>

                                        <span className="review-time">recently</span>
                                    </div>
                                    <div className="review-stars-row">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} color={i < rev.rating ? "#ffc107" : "#333"} />
                                        ))}
                                    </div>
                                    <p className="review-text">{rev.comment}</p>
                                </div>
                            )) : <p>No reviews yet. Be the first !</p>}
                        </div>

                        {/* القسم الأيمن لإضافة تعليق */}
                        <div className="add-review-section">
                            <h4>Did you like the product ? What's your rating ? </h4>

                            <form className="review-form" onSubmit={handleReviewSubmit}>
                                <div className="rating-input-group">
                                    <span>Your Rating *</span>
                                    <div className="stars-input">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className="star-clickable"
                                                color={i < userRating ? "#ffc107" : "#666"}
                                                onClick={() => setUserRating(i + 1)}
                                                style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '5px' }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="text-input-group">
                                    <span>Your Review *</span>
                                    <textarea
                                        placeholder="Write your comment here..."
                                        value={userComment}
                                        onChange={(e) => setUserComment(e.target.value)}
                                        maxLength={200}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-review-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;