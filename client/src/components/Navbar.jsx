import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow">
      <div className="text-2xl font-bold text-orange-600">Lunch Box</div>
      <ul className="flex items-center space-x-6">
        <Link to={"/"}>
          <li>
            <a href="#" className="hover:text-orange-500">
              Home
            </a>
          </li>
        </Link>
        {/* <li>
          <a href="#" className="hover:text-orange-500">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-orange-500">
            Career
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-orange-500">
            Contact Us
          </a>
        </li>
        <li>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Login
          </button>
        </li> */}
        <Link to={"/cart"}>
          <li>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </a>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
