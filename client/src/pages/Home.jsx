import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";

export const Home = () => {
  const menu = useContext(MenuContext);
  menu.startBackend();
  return (
    <div className="font-sans ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-orange-500 py-20 md:px-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-7/12 pr-0 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-8xl font-bold mb-4">DLunch Box</h1>
            <p className="text-xl md:text-4xl  mb-8">
              Hungry? You are in the right place
            </p>
            <p className="text-lg md:text-2xl  mb-8">Delight delivered</p>
            <Link to={"/menu-selection"}>
              <button className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 text-xl font-semibold">
                Online Order
              </button>
            </Link>
          </div>
          <div className="w-full md:w-5/12">
            <img
              src="/path-to-delivery-image.png"
              alt="Delivery"
              className="w-96"
            />
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="py-16 bg-white md:px-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
            <div className="text-center md:w-1/3 px-4">
              <img
                src="/path-to-choose-meals-icon.png"
                alt="Choose your Meals"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Choose your Meals</h3>
              <p>
                Craft your perfect meal for just Rs.90: Customize your lunch
                box, your way!
              </p>
            </div>
            <div className="text-center md:w-1/3 px-4">
              <img
                src="/path-to-delivery-icon.png"
                alt="Faster Delivery"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Faster Delivery</h3>
              <p>
                From kitchen to doorstep in a flash: lunchtime satisfaction
                guaranteed!
              </p>
            </div>
            <div className="text-center md:w-1/3 px-4">
              <img
                src="/path-to-cook-deliver-icon.png"
                alt="We Cook & Deliver Faster"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">We Cook & Deliver Faster</h3>
              <p>
                Savor the flavor of health: Where delicious meets nutritious in
                every bite!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-green-100 md:px-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why customers choose us
          </h2>
          <p className="text-center mb-12">
            Our commitment to exceptional quality and unparalleled customer
            service sets us apart.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src="/path-to-customized-icon.png"
                alt="Customised Lunch"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold mb-2">Customised Lunch</h3>
              <p>
                We offer customized lunch boxes tailored to your preferences,
                ensuring your meals are both delicious and convenient.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src="/path-to-hygiene-icon.png"
                alt="Hygienically Packed"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold mb-2">Hygienically Packed</h3>
              <p>
                Hygienically packed lunches are essential for maintaining food
                safety and preventing contamination.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src="/path-to-menu-icon.png"
                alt="Mindful Menu"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold mb-2">Mindful Menu</h3>
              <p>
                The lunch menu was crafted to promote health and wellness,
                offering an array of nourishing dishes to inspire mindful eating
                habits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <img
                src="/path-to-cooking-icon.png"
                alt="Healthy Cooking"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-bold mb-2">Healthy Cooking</h3>
              <p>
                Healthy cooking techniques were employed to create a vibrant and
                nutritious menu, ensuring that every dish is not only delicious
                but also promotes overall well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Options */}
      <section className="py-16 bg-white md:px-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Menu Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <img
                src="/path-to-daily-order-icon.png"
                alt="Daily Order"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Daily Order</h3>
              <p>
                Instant homemade food order during breakfast, lunch, high tea,
                and dinner
              </p>
            </div>
            <div className="text-center">
              <img
                src="/path-to-advance-order-icon.png"
                alt="Advance Order"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Advance Order</h3>
              <p>
                You can order your choice of homemade food in advance for up to
                2 days. Now you plan in advance for a perfect weekend.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/path-to-regional-snacks-icon.png"
                alt="Regional Snacks"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Regional Snacks</h3>
              <p>
                You can order a variety of your choice regional snacks such as
                pickles, papad, sweets, any side snacks, etc.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/path-to-authentic-food-icon.png"
                alt="Authentic Regional Food"
                className="w-36 mx-auto mb-4"
              />
              <h3 className="font-bold mb-2">Authentic Regional Food</h3>
              <p>
                No more cravings for regional food! Now you can get authentic
                regional food at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
