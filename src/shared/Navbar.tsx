import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Meal Link
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>

          {/* Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-gray-300 focus:outline-none"
            >
              Auth <ChevronDown size={16} className="ml-1" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md overflow-hidden">
                <li>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-gray-200">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-700 text-white space-y-4 p-4 mt-2">
          <li>
            <Link to="/" className="block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block">
              About
            </Link>
          </li>

          {/* Mobile Dropdown */}
          <li>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center w-full justify-between"
            >
              Auth <ChevronDown size={16} />
            </button>
            {isDropdownOpen && (
              <ul className="mt-2 bg-gray-600 rounded-md overflow-hidden">
                <li>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-500">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-gray-500">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/about" className="block">
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
