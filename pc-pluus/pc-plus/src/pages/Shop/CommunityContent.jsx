import React, { useEffect, useState } from 'react'
import './shop.css'
import CommunityCards from '../../components/shopCarts/CommunityCards';
const CommunityContent = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchCommunityPosts = async () => {
      try {
       
        const response = await fetch('http://localhost:5000/api/userproducts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching community posts:", error);
        setError(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityPosts();

  }, []);

  if (loading) return <div className="loading">Loading community posts.....</div>;
  if (error) return <div className="error-state">wrong happen: {error}</div>;

  return (


    <div className='CommunityContent-container'>

      {

        posts.map((post) => (

          <CommunityCards key={post._id} posts={post} />
        ))

      }
      
    </div>
  )
}
export default CommunityContent