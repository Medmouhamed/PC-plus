// Contex/FavoriteContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('local_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('local_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const [loading, setLoading] = useState(false);
    const API_URL = "http://localhost:5000/api/favorites";


    const addToFavorites = (product) => {
        
        if (favorites.some(item => item._id === product._id)) {
            alert("This product is already in your favorites!");
            return;
        }

        const API_URL = "http://localhost:5000";
        
        let imagePath = (product.images && product.images[0]) || product.imageUrl || product.image || product.displayImage;

        const finalImage = (imagePath && typeof imagePath === 'string' && !imagePath.startsWith('http'))
            ? `${API_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath.replace(/\\/g, '/')}`
            : imagePath;

        const manualProduct = {
            ...product,
            displayImage: finalImage,
            name: product.name || product.brand || "Unknown Product",
            price: product.price || 0,
            ownerName: product.owner?.name || "Member"
        };

        setFavorites(prev => [...prev, manualProduct]);
    };

    // 3. حذف منتج من المفضلة 
    const removeFromFavorites = async (productId) => {
        const previousFavorites = [...favorites];
        setFavorites(prev => prev.filter(item => item._id !== productId));

        try {
            const response = await fetch(`${API_URL}/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                setFavorites(previousFavorites);
            }
        } catch (error) {
            console.error("Error removing from favorites:", error);
            setFavorites(previousFavorites);
        }
    };

    
    const isFavorite = (productId) => {
        return favorites.some(item => item._id === productId);
    };

    return (
        <FavoriteContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite, 
            loading
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoriteContext);