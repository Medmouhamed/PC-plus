import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {


    const [cartItems, setCartItems] = useState([]);
    const API_URL = "http://localhost:5000/api/cart";

    const fetchCart = async () => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => { fetchCart(); }, []);

    // إضافة منتج
    const addToCart = async (product) => {
        const newItem = {
            _id: Date.now().toString(), 
            product: product,           
            quantity: 1
        };

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, newItem];
        });

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product._id, quantity: 1 }),
                credentials: 'include'
            });
        } catch (error) { console.error("Sync error:", error); }
    };

    // تعديل الكمية يدوياً فوراً
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        // تحديث محلي فوري
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product._id === productId ? { ...item, quantity: newQuantity } : item
            )
        );

        try {
            await fetch(`${API_URL}/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQuantity }),
                credentials: 'include'
            });
        } catch (error) { console.error("Update error:", error); }
    };

    const removeFromCart = async (productId) => {
      
        setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));

        try {
            await fetch(`${API_URL}/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
        } catch (error) { console.error("Delete error:", error); }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);