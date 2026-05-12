import React, { useState } from 'react'
import ShopHeader from '../../components/shopHeader/ShopHeader'
import SideBar from '../../components/shopSidebar/SideBar';
import PcPlusContent from './PcPlusContent';
import CommunityContent from './CommunityContent';
import UserAddContent from './UserAddContent';
import { useAuth } from '../../Contex/AuthContext';
import './shop.css'
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Shop = () => {

    const [activeTab, setActiveTab] = useState('pc-plus');

    const { user } = useAuth();

    const { id } = useParams(); 
    const navigate = useNavigate();

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        if (id) {
            navigate('/Shop'); 
        }
    };

    const renderTabContent = () => {

        if (id) {
            return <ProductDetails id={id} onBack={() => navigate('/Shop')} />;
        }
        switch (activeTab) {
            case 'pc-plus':
                return <PcPlusContent onProductSelect={(productId) => navigate(`/Shop/ProductDetails/${productId}`)} />;
            case 'community':
                return <CommunityContent />;
            case 'user-products':
                return <UserAddContent />;
            default:
                return <PcPlusContent onProductSelect={(productId) => navigate(`/Shop/ProductDetails/${productId}`)} />;
        }
    };

    return (

        <div className='Shop-page-container'>

            <ShopHeader
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                user={user} />

            <div className="shop-body">

                {(activeTab !== 'user-products' && !id) && <SideBar />}

                <main className={`main-content ${(activeTab === 'user-products' || id) ? 'full-width' : ''}`}>
                    {renderTabContent()}
                </main>
            </div>

        </div>
    )
}

export default Shop