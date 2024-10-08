import React, { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";
import { MealContext } from "../context/MealContext";
import { useNavigate } from "react-router-dom";
import { MenuCard } from "../components/MenuCard";

export const MenuSelection = () => {
  const [view, setView] = useState("mealTypeSelection");
  const meal = useContext(MealContext);
  const menu = useContext(MenuContext);
  const navigate = useNavigate();

  const [extraChapatiCount, setExtraChapatiCount] = useState(0);

  const incrementChapati = () => {
    setExtraChapatiCount((prevCount) => prevCount + 1);
    meal.setSelectedMeal((oldData) => ({
      ...oldData,
      extraChapatiCount: extraChapatiCount,
    }));

    console.log(`after increment : ${extraChapatiCount}`);
  };

  const decrementChapati = () => {
    setExtraChapatiCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    meal.setSelectedMeal((oldData) => ({
      ...oldData,
      extraChapatiCount: extraChapatiCount,
    }));
  };

  // const incrementChapati = () => setExtraChapatiCount((prev) => prev + 1);
  // const decrementChapati = () =>
  //   setExtraChapatiCount((prev) => (prev > 0 ? prev - 1 : 0));

  let vegetable = menu.menus.filter(
    (menu) =>
      menu.mealType === meal.selectedMeal.type && menu.category === "vegetable"
  );
  let chapatis = menu.menus.filter((menu) => menu.category === "chapati");
  let riceDal = menu.menus.filter(
    (menu) =>
      menu.mealType === meal.selectedMeal.type && menu.category === "rice"
  );
  let dessert = menu.menus.filter((menu) => menu.category === "dessert");

  let content;

  if (view === "mealTypeSelection") {
    content = (
      <div className="flex flex-col items-center gap-5 mt-10">
        <h1 className="text-3xl font-medium font-poppins">Select Meal Type</h1>
        <div className="flex gap-10">
          <button
            onClick={() => {
              meal.setSelectedMeal((prevMeal) => ({
                ...prevMeal,
                type: "veg",
              }));
              setView("vegetableSelection");
            }}
            className="bg-green-600 w-28 text-white font-poppins hover:bg-green-700 py-2 rounded-md text-xl font-semibold"
          >
            Veg
          </button>
          <button
            onClick={() => {
              meal.setSelectedMeal((prevMeal) => ({
                ...prevMeal,
                type: "non veg",
              }));
              setView("vegetableSelection");
            }}
            className="bg-red-500 w-28 text-white font-poppins hover:bg-red-700 py-2 rounded-md text-xl font-semibold"
          >
            Non Veg
          </button>
        </div>
      </div>
    );
  } else if (view === "vegetableSelection") {
    content = (
      <div className="flex flex-col items-center my-5 h-screen text-center pb-20">
        <h1 className="text-3xl font-poppins">
          Select {meal.selectedMeal.type === "veg" ? 2 : 1} vegetables of your
          choice:
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 pb-20 ">
          {vegetable.map((item, key) => (
            <MenuCard
              key={key}
              name={item.name}
              desc={item.desc}
              id={item.id}
              price={item.price}
              category="vegetable"
              isAdded={meal.selectedMeal.vegetables.includes(item.id)}
            />
          ))}
        </div>
        {/* <div className="my-10 text-white">dfddfdf</div> */}
      </div>
    );
  } else if (view === "otherMenuSelection") {
    content = (
      <div className="flex flex-col items-center mt-5 text-center">
        <h1 className="text-3xl font-poppins text">
          Choose one option from each category:
        </h1>
        <div className="flex flex-col items-center gap-5 py-5">
          {/* <h2 className="text-2xl font-semibold">Chapati</h2> */}
          <div className="flex items-center ">
            <hr className="w-28 mx-3 border-t border-stone-300" />
            <h2 className="text-2xl font-semibold">Chapati</h2>
            <hr className="w-28 mx-3 border-t border-stone-300" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-4">
            {chapatis.map((item, key) => (
              <MenuCard
                key={key}
                name={item.name}
                desc={item.desc}
                id={item.id}
                price={item.price}
                category="chapati"
                isAdded={meal.selectedMeal.chapati === item.id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 py-5">
          {/* <h2 className="text-2xl font-semibold">Rice</h2> */}
          <div className="flex items-center">
            <hr className="w-28 mx-3 border-t border-stone-300" />
            <h2 className="text-2xl font-semibold">Rice</h2>
            <hr className="w-28 mx-3 border-t border-stone-300" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {riceDal.map((item, key) => (
              <MenuCard
                key={key}
                name={item.name}
                desc={item.desc}
                id={item.id}
                price={item.price}
                category="rice"
                isAdded={meal.selectedMeal.rice === item.id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 py-5">
          {/* <h2 className="text-2xl font-semibold">Dessert</h2> */}
          <div className="flex items-center">
            <hr className="w-28 mx-3 border-t border-stone-300" />
            <h2 className="text-2xl font-semibold">Dessert</h2>
            <hr className="w-28 mx-3 border-t border-stone-300" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {dessert.map((item, key) => (
              <MenuCard
                key={key}
                name={item.name}
                desc={item.desc}
                id={item.id}
                price={item.price}
                category="dessert"
                isAdded={meal.selectedMeal.dessert === item.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (view === "ExtraChapatiSelection") {
    content = (
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-3xl font-poppins">Select extra chapatis:</h1>
        <div className="flex items-center gap-4 py-5">
          <button
            onClick={decrementChapati}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded text-xl"
          >
            -
          </button>
          <span className="text-2xl font-bold">{extraChapatiCount}</span>
          <button
            onClick={() => {
              console.log(`before increment : ${extraChapatiCount}`);
              incrementChapati();
            }}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded text-xl"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <div className="bg-amber-300 py-5 text-2xl font-bold text-center font-poppins w-full px-4">
        Customize your lunch according to your taste😋
      </div>
      <div className="">{content}</div>

      {view !== "mealTypeSelection" && (
        <div className="fixed flex gap-5 right-5 bottom-5">
          <button
            onClick={() => {
              if (view === "vegetableSelection") {
                setView("mealTypeSelection");
              } else if (view === "otherMenuSelection") {
                setView("vegetableSelection");
              } else if (view === "ExtraChapatiSelection") {
                setView("otherMenuSelection");
              }
            }}
            className="bg-green-500 w-36 py-2 text-2xl font-semibold rounded-lg"
          >
            Back
          </button>

          <button
            onClick={() => {
              if (view === "vegetableSelection") {
                setView("otherMenuSelection");
              } else if (view === "otherMenuSelection") {
                setView("ExtraChapatiSelection");
              } else if (view === "ExtraChapatiSelection") {
                // Update extra chapati count in MealContext
                meal.setSelectedMeal((prevMeal) => ({
                  ...prevMeal,
                  extraChapatiCount: extraChapatiCount,
                }));
                meal.addToCart(); // Add the meal to the cart
                navigate("/cart"); // Redirect to cart page after adding
              }
            }}
            className="bg-green-500 w-36 py-2 text-2xl font-semibold rounded-lg "
          >
            {view === "ExtraChapatiSelection" ? "Add to Cart" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};
