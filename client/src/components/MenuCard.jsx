// import React, { useContext } from "react";
// import { MealContext } from "../context/MealContext";

// export const MenuCard = ({ id, name, desc, price, isAdded }) => {
//   const meal = useContext(MealContext);
//   const handleClick = () => {
//     if (isAdded) {
//       meal.removeMenuFromMeal(id);
//     } else {
//       meal.addMenuToMeal(id);
//     }
//   };
//   return (
//     <div className=" flex flex-col w-60 border rounded-lg shadow py-3 px-3">
//       <h1 className="text-xl font-semibold">{name}</h1>
//       <h3 className="text-sm text-stone-600">{desc}</h3>
//       <button
//         onClick={handleClick}
//         className={` py-1 w-1/2 px-2 text-white rounded font-semibold mt-3 ${
//           isAdded ? "bg-red-600" : "bg-green-600"
//         }`}
//       >
//         {isAdded ? "Remove" : "Add"}
//       </button>
//     </div>
//   );
// };

//////////////////////////////////////////////////////////////////////////////////

import React, { useContext } from "react";
import { MealContext } from "../context/MealContext";

export const MenuCard = ({ id, name, desc, price, isAdded, category }) => {
  const meal = useContext(MealContext);

  const handleClick = () => {
    if (isAdded) {
      meal.removeMenuFromMeal(id, category);
    } else {
      meal.addMenuToMeal(id, category);
    }
  };

  return (
    <div className="flex flex-col w-60 border rounded-lg shadow py-3 px-3">
      <h1 className="text-xl font-semibold">{name}</h1>
      <h3 className="text-sm text-stone-600">{desc}</h3>
      <button
        onClick={handleClick}
        className={`py-1 w-1/2 px-2 text-white rounded font-semibold mt-3 ${
          isAdded ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {isAdded ? "Remove" : "Add"}
      </button>
    </div>
  );
};
