// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

// Create a CartContext
const CartContext = createContext();

// Create a CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${baseUrl}/showcart`);
      setCart(response.data.cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItemToCart = async (item) => {
    const existingItem = cart.items.find((i) => i.id === item.id);
    if (existingItem) {
      updateItemQuantity(item.id, existingItem.quantity + 1);
    } else {
      try {
        const response = await axios.post(`${baseUrl}/addToCart`, {
          menuId: item.id,
          quantity: 1,
        });
        setCart(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const response = await axios.post(`${baseUrl}/removefromcart`, {
        cartId: itemId,
      });
      fetchCart();
      // setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(`${baseUrl}/updateQuantity`, {
        cartId: itemId,
        quantity: newQuantity,
      });
      fetchCart();
      // setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

// Export the CartContext and CartProvider
export { CartProvider, CartContext };
