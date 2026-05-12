import React, { useEffect, useState } from 'react'
import './shop.css'
import PcplusCarts from '../../components/shopCarts/PcplusCarts'



const PcPlusContent = ({ onProductSelect }) => {



  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); 
        if (!response.ok) {
          throw new Error('faild get products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading-state">loading .......</div>;
  if (error) return <div className="error-state">wrong happen: {error}</div>;


  return (

    <div className='PcPlusContent-container'>

      {
        products.map((prod) => (

          <PcplusCarts key={prod._id} product={prod} onProductSelect={onProductSelect} />
        ))

      }


    </div>
  )
}

export default PcPlusContent