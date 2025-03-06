import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  Info,
  User,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import { toast } from "react-hot-toast"; // Assuming react-hot-toast is installed
import ProjectLogo from "../assets/ProjectLogo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Retrieve role from localStorage safely
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const role = parsedUser?.role;

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Display toast notification
    toast.success("Successfully logged out!");
    navigate("/");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"
      } fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      <div className="container mx-auto flex justify-between items-center p-4 ">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center text-white text-xl font-bold">
          <img src={ProjectLogo} alt="Logo" className="h-10 w-auto mr-2" />
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Meal Link
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none hover:bg-gray-700 p-2 rounded-md transition-all"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <ul className="flex space-x-1 text-white">
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
              >
                <Home size={18} className="mr-1" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
              >
                <Info size={18} className="mr-1" />
                <span>About</span>
              </Link>
            </li>

            {/* Profile Link Based on Role */}
            {role === "donor" ? (
              <li>
                <Link
                  to="/donor_profile"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                >
                  <User size={18} className="mr-1" />
                  <span>Profile</span>
                </Link>
              </li>
            ) : role === "ngo" ? (
              <li>
                <Link
                  to="/ngo_profile"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                >
                  <User size={18} className="mr-1" />
                  <span>Profile</span>
                </Link>
              </li>
            ) : null}

            {/* Conditional Claim/Donate Links */}
            {role === "ngo" ? (
              <li>
                <Link
                  to="/ngos"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                >
                  <Package size={18} className="mr-1" />
                  <span>Claim</span>
                </Link>
              </li>
            ) : role === "donor" ? (
              <li>
                <Link
                  to="/donors"
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                >
                  <Package size={18} className="mr-1" />
                  <span>Donate</span>
                </Link>
              </li>
            ) : null}
          </ul>

          {/* Authentication Section */}
          <div className="ml-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all shadow"
              >
                <LogOut size={18} className="mr-1" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all shadow"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide-in from right */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden bg-gray-800 w-64 shadow-lg transition duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-white text-lg font-bold">Menu</span>
          <button
            onClick={closeMenu}
            className="text-white focus:outline-none hover:bg-gray-700 p-2 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="p-4 space-y-2 text-white">
          <li>
            <Link
              to="/"
              className="flex items-center p-3 rounded-md hover:bg-gray-700"
              onClick={closeMenu}
            >
              <Home size={18} className="mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center p-3 rounded-md hover:bg-gray-700"
              onClick={closeMenu}
            >
              <Info size={18} className="mr-2" />
              <span>About</span>
            </Link>
          </li>

          {/* Profile Link for Mobile Menu */}
          {role === "donor" ? (
            <li>
              <Link
                to="/donor_profile"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
                onClick={closeMenu}
              >
                <User size={18} className="mr-2" />
                <span>Profile</span>
              </Link>
            </li>
          ) : role === "ngo" ? (
            <li>
              <Link
                to="/ngo_profile"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
                onClick={closeMenu}
              >
                <User size={18} className="mr-2" />
                <span>Profile</span>
              </Link>
            </li>
          ) : null}

          {/* Conditional Claim/Donate Links */}
          {role === "ngo" ? (
            <li>
              <Link
                to="/ngos"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
                onClick={closeMenu}
              >
                <Package size={18} className="mr-2" />
                <span>Claim</span>
              </Link>
            </li>
          ) : role === "donor" ? (
            <li>
              <Link
                to="/donors"
                className="flex items-center p-3 rounded-md hover:bg-gray-700"
                onClick={closeMenu}
              >
                <Package size={18} className="mr-2" />
                <span>Donate</span>
              </Link>
            </li>
          ) : null}

          <li>
            <Link
              to="/contact"
              className="flex items-center p-3 rounded-md hover:bg-gray-700"
              onClick={closeMenu}
            >
              <span>Contact</span>
            </Link>
          </li>

          {/* Authentication for Mobile Menu */}
          <li className="pt-4 border-t border-gray-700 ">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full bg-red-500   hover:bg-red-600 text-white py-3 px-4 rounded-md flex items-center justify-center"
              >
                <LogOut size={18} className="mr-2 " />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-700"
                >
                  <span>Authentication</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <ul className="mt-2 bg-gray-700 rounded-md overflow-hidden shadow-inner">
                    <li>
                      <Link
                        to="/login"
                        className="block px-6 py-3 hover:bg-gray-600"
                        onClick={closeMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block px-6 py-3 hover:bg-gray-600"
                        onClick={closeMenu}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
}
