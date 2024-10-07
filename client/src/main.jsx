import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MenuProvider } from "./context/MenuContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { MealProvider } from "./context/MealContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MenuProvider>
      <CartProvider>
        <MealProvider>
          <App />
        </MealProvider>
      </CartProvider>
    </MenuProvider>
  </StrictMode>
);
