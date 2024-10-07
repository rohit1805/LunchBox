import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { MealContext } from "../context/MealContext";

export const Cart = () => {
  const cartContext = useContext(CartContext);
  const meal = useContext(MealContext);
  const cartData = cartContext.cart || [];
  const totalQuantity = cartContext.cart.length;
  //   meal.resetMenu();
  useEffect(() => {
    //   cartContext.fetchCart();
    meal.resetMenu();
  }, []);

  console.log("Cart items : ", cartContext.cart);

  return (
    <div className="max-w-4xl mt-10 mx-5">
      <h1 className="text-3xl font-bold mb-6">Your Customized Order</h1>

      {cartData.map((order, index) => (
        <div
          key={order.id}
          className="mb-6 p-4 shadow-md rounded-md border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-semibold">Order Id: {order.id}</h2>
              <p className="text-sm text-gray-500">
                Meal Type: {order.mealType}
              </p>
            </div>
            <button
              onClick={() => cartContext.removeItemFromCart(order.id)}
              className="text-red-500 hover:bg-red-500 hover:text-white p-1 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-2 flex-wrap mb-2">
            {order.meal.map((item, idx) => (
              <span
                key={idx}
                className={`py-1 px-3 rounded-full text-sm font-semibold ${
                  item.menu.category === "vegetable"
                    ? "bg-yellow-200 text-black"
                    : item.menu.category === "chapati"
                    ? "bg-blue-200 text-black"
                    : item.menu.category === "rice"
                    ? "bg-green-200 text-black"
                    : item.menu.category === "dessert"
                    ? "bg-pink-200 text-black"
                    : "bg-purple-200 text-black"
                }`}
              >
                {item.menu.category === "extraChapati"
                  ? `${item.quantity}  ${item.menu.name}`
                  : item.menu.name}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() =>
                  cartContext.updateItemQuantity(order.id, order.quantity - 1)
                }
                className="bg-yellow-500 text-white py-1 px-2 rounded-md text-lg mr-2"
              >
                -
              </button>
              <span>{order.quantity}</span>
              <button
                onClick={() =>
                  cartContext.updateItemQuantity(order.id, order.quantity + 1)
                }
                className="bg-green-500 text-white py-1 px-2 rounded-md text-lg ml-2"
              >
                +
              </button>
            </div>
            <p className="font-semibold text-xl">₹ {order.price}</p>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 shadow-md rounded-md border border-gray-200">
        <div className="flex justify-between items-center">
          {/* <p className="font-semibold text-lg">Total Price: ₹ {totalPrice}</p> */}
          <p className="font-semibold text-lg">
            Total Quantities: {totalQuantity}
          </p>
        </div>
        <button
          //   onClick={() => cartContext.placeOrder()}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-semibold w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
