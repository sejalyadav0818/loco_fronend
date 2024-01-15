import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", text: "Create Form" },
  { to: "/show", text: "Show" },
];

const NavBar = (props) => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">LocoTagger</h1>
          </div>
          <div className="sm:hidden">
            {/* Mobile menu button */}
            <button
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium focus:outline-none focus:shadow-outline"
              onClick={() => console.log("Toggle mobile menu")}
            >
              Menu
            </button>
          </div>
          <div className="hidden sm:block">
            <div className="ml-4 flex space-x-4">
              {navLinks.map((link, index) => (
                <Link
                  to={link.to}
                  key={index}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="sm:hidden mt-2">
          <div className="ml-4 flex space-x-4">
            {navLinks.map((link, index) => (
              <Link
                to={link.to}
                key={index}
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
