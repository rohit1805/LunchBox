import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/menus`);
        setMenus(response.data.allMenus);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) {
    return <div>Loading menus...</div>;
  }

  if (error) {
    return <div>Error loading menus: {error.message}</div>;
  }

  return (
    <MenuContext.Provider value={{ menus }}>{children}</MenuContext.Provider>
  );
};
