
import React, { useEffect, useRef, useState } from 'react'
import './UserAdd.css'
import { useAuth } from '../../Contex/AuthContext'
import { FaPlus, FaTimes, FaCamera } from 'react-icons/fa';
import nopostImg from '../../assets/nopostImg.png'
import UserAddCarts from '../../components/shopCarts/UserAddCarts';

const UserAddContent = () => {


  const [myPosts, setMyPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [editingPost, setEditingPost] = useState(null);

  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'cpu',
    price: '',
    location: '',
    phone: '',
    images: null
  });

  const fetchMyPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/userproducts/myposts', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setMyPosts(data);
      }
    } catch (error) {
      console.error("Error fetching my posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyPosts();
  }, [user]);


  const handleEditClick = (post) => {

    setEditingPost(post); 
    setFormData({

      name: post.name,
      description: post.description,
      category: post.category,
      price: post.price,
      location: post.location,
      phone: post.phone,
      images: null 

    });
    const oldImage = post.images ? `http://localhost:5000${post.images}` : null;
    setImagePreview(oldImage);
    setShowModal(true);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0]; // الحصول على الملف الأول المختار
    if (file) {
      // تحديث الحالة بالملف الفعلي
      setFormData({ ...formData, images: file });

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeletePost = async (postId) => {

    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/userproducts/${postId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          // تحديث القائمة بعد الحذف مباشرة دون إعادة تحميل الصفحة
          setMyPosts(myPosts.filter(p => p._id !== postId));
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('category', formData.category);
    dataToSend.append('price', formData.price);
    dataToSend.append('location', formData.location);
    dataToSend.append('phone', formData.phone);

    if (formData.images) {

      dataToSend.append('images', formData.images);

    }

    try {

      const url = editingPost
        ? `http://localhost:5000/api/userproducts/${editingPost._id}`
        : 'http://localhost:5000/api/userproducts';

      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        body: dataToSend
      });

      if (response.ok) {
        const updatedData = await response.json();

        alert(editingPost ? "Post Updated Successfully!" : "Post Created Successfully!");

        if (editingPost) {
           setMyPosts(prev => prev.map(p => p._id === editingPost._id ? updatedData : p));
        } else {
           fetchMyPosts(); // في حالة إضافة منشور جديد
        }
        handleCloseModal();

      } else {
        const error = await response.json();
        alert(error.message || "Operation failed");
      }
    } catch (err) {

      alert("Connection error: " + err.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPost(null);
    setFormData({ name: '', description: '', category: 'cpu', price: '', location: '', phone: '', images: null });
    setImagePreview(null);
  }

  if (!user) return <div className="error-state">Please Login to see your products.</div>;

  return (


    <div className='UserAddContent-page-container'>

      <button className="floating-add-btn" onClick={() => setShowModal(true)}>
        <FaPlus />
      </button>

      <div className="my-posts-grid">

        {myPosts.length > 0 ? (

          myPosts.map(post => <UserAddCarts
            key={post._id}
            posts={post}
            onDelete={handleDeletePost}
            onEdit={handleEditClick}
          />)
        ) : (
          <div className="no-posts">
            <img src={nopostImg} alt="No Posts" />
            <p>No Posts Yet.</p>
          </div>
        )}
      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="create-post-modal">

            <div className="modal-header">
              <h3>{editingPost ? "Edit Post" : `(${user.name}) Create Post`}</h3>
              <FaTimes className="close-icon" onClick={handleCloseModal} />
            </div>

            <form onSubmit={handleSubmit} className="modal-form">

              <div className="form-left">
                <label>NAME</label>
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Product Name" />

                <label>SELECT CATEGORY</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="cpu">CPU</option>
                  <option value="gpu">GPU</option>
                  <option value="ram">RAM</option>
                  <option value="case">Case</option>
                </select>

                <label>PLACE</label>
                <input required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Product Place" />

                <label>DESCRIPTION</label>
                <textarea maxLength={200} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="form-right">


                <input type='file' accept='image/*' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />

                <div
                  className="image-upload-placeholder"
                  onClick={() => fileInputRef.current.click()} 
                  style={{ overflow: 'hidden' }} 
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <FaCamera className='facamira-inpt' />
                      <span>Add Picture</span>
                    </>
                  )}
                </div>

                <label>PHONE NUMBER:</label>
                <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type='tel' maxLength={10} placeholder="00 00 00 00 00" />

                <label>PUT A PRICE:</label>
                <div className="price-input-wrapper">
                  <input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="10000.00" />
                  <span>DA</span>
                </div>

                <button type="submit" className="post-submit-btn">{editingPost ? "Update Now" : "Post"}<span className="arrow">▶</span></button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  )
}

export default UserAddContent