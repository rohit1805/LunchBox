import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow md:px-32">
      <div className="text-2xl font-bold text-orange-600">Lunch Box</div>
      <ul className="flex items-center space-x-6">
        <Link to={"/"}>
          <li>
            <a href="#" className="hover:text-orange-500 text-lg font-medium">
              Home
            </a>
          </li>
        </Link>
        <Link to={"/cart"}>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
