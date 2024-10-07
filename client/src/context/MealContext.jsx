import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
const baseUrl = import.meta.env.VITE_BASE_URL;

const MealContext = createContext();

const MealProvider = ({ children }) => {
  const [selectedMeal, setSelectedMeal] = useState({
    type: "",
    menuIds: [],
    quantity: 1,
    extraChapatiCount: 0, // Track extra chapatis
    vegetables: [], // Track selected vegetables separately
    chapati: null, // Track selected chapati option
    rice: null, // Track selected rice option
    dessert: null, // Track selected dessert option
  });

  const cartContext = useContext(CartContext);

  const addMenuToMeal = (id, category) => {
    setSelectedMeal((oldData) => {
      if (category === "vegetable") {
        // Limit vegetables based on meal type
        const maxVeg = oldData.type === "veg" ? 2 : 1;
        if (oldData.vegetables.length < maxVeg) {
          return { ...oldData, vegetables: [...oldData.vegetables, id] };
        } else {
          return oldData; // Don't allow adding more vegetables
        }
      } else if (category === "chapati") {
        // Replace previous chapati selection
        return { ...oldData, chapati: id };
      } else if (category === "rice") {
        // Replace previous rice selection
        return { ...oldData, rice: id };
      } else if (category === "dessert") {
        // Replace previous dessert selection
        return { ...oldData, dessert: id };
      } else {
        return { ...oldData, menuIds: [...oldData.menuIds, id] };
      }
    });
  };

  const removeMenuFromMeal = (id, category) => {
    setSelectedMeal((oldData) => {
      if (category === "vegetable") {
        return {
          ...oldData,
          vegetables: oldData.vegetables.filter((vegId) => vegId !== id),
        };
      } else if (category === "chapati") {
        return { ...oldData, chapati: null }; // Remove chapati selection
      } else if (category === "rice") {
        return { ...oldData, rice: null }; // Remove rice selection
      } else if (category === "dessert") {
        return { ...oldData, dessert: null }; // Remove dessert selection
      } else {
        return {
          ...oldData,
          menuIds: oldData.menuIds.filter((menuId) => menuId !== id),
        };
      }
    });
  };

  //   const addToCart = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:3000/addToCart", {
  //         menuIds: selectedMeal.menuIds, // Regular menu item IDs
  //         mealType: selectedMeal.type, // Meal type (veg or non-veg)
  //         quantity: selectedMeal.quantity, // Base meal quantity
  //         extraChapatiCount: selectedMeal.extraChapatiCount, // Number of extra chapatis
  //       });

  //       const data = response.data;
  //       await cartContext.fetchCart();
  //       console.log("Cart data from the api direct : ", data);
  //       // setCart(data); // Update cart in CartContext with response data
  //     } catch (error) {
  //       console.error(
  //         "Error adding meal to cart",
  //         error.response ? error.response.data : error.message
  //       );
  //     }
  //   };

  const addToCart = async () => {
    console.log("Data from Meal context : ", selectedMeal);

    try {
      const response = await axios.post(`${baseUrl}/addToCart`, {
        menuIds: [
          ...selectedMeal.vegetables,
          selectedMeal.chapati,
          selectedMeal.rice,
          selectedMeal.dessert,
        ],
        mealType: selectedMeal.type,
        quantity: selectedMeal.quantity,
        extraChapatiCount: selectedMeal.extraChapatiCount,
      });

      const data = response.data;
      await cartContext.fetchCart();
      console.log("Cart data from the api direct : ", data);
    } catch (error) {
      console.error(
        "Error adding meal to cart",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <MealContext.Provider
      value={{
        selectedMeal,
        setSelectedMeal,
        addMenuToMeal,
        removeMenuFromMeal,
        addToCart,
        resetMenu: () =>
          setSelectedMeal({
            type: "",
            menuIds: [],
            quantity: 1,
            extraChapatiCount: 0,
            vegetables: [],
            chapati: null,
            rice: null,
            dessert: null,
          }),
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

const useMealContext = () => useContext(MealContext);

export { MealProvider, MealContext, useMealContext };
