import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../services/userService";
import { IMAGE_BASE_URL } from "../../services/axiosInstance";

const NewNavbar = () => {
  const userRole = Cookies.get("userRole");
  const profilePic = Cookies.get("profilePic");
  const token = Cookies.get("token");

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf9f5]/80 dark:bg-[#1b1c1a]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(27,28,26,0.05)]">
      <div className="flex justify-between items-center px-8 h-20 max-w-screen-2xl mx-auto">
        <Link
          to={token ? "/home" : "/"}
          className="text-2xl font-notoSerif italic text-[#00333c] dark:text-[#ffffff]"
        >
          Kitabi Tany
        </Link>
        <div className="hidden md:flex space-x-8 items-center font-notoSerif tracking-tight font-light">
          <Link
            className="text-[#5c5e58] dark:text-[#91928d] hover:text-[#00333c] dark:hover:text-white transition-colors duration-300"
            to="/home?category=Classic"
          >
            Classics
          </Link>
          <Link
            className="text-[#5c5e58] dark:text-[#91928d] hover:text-[#00333c] dark:hover:text-white transition-colors duration-300"
            to="/home?category=Fiction"
          >
            Fiction
          </Link>
          <Link
            className="text-[#5c5e58] dark:text-[#91928d] hover:text-[#00333c] dark:hover:text-white transition-colors duration-300"
            to="/home?category=Academic"
          >
            Academic
          </Link>
          <Link
            className="text-[#5c5e58] dark:text-[#91928d] hover:text-[#00333c] dark:hover:text-white transition-colors duration-300"
            to="/home?category=Rare Finds"
          >
            Rare Finds
          </Link>
        </div>
        <div className="flex items-center space-x-6 text-[#004B57] dark:text-[#bae8f0]">
          {token ? (
            <>
              {userRole === "buyer" && (
                <Link
                  to="/home"
                  className="hover:text-[#00333c] transition-transform active:scale-95 duration-200"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </Link>
              )}
              <Link
                to="/profile"
                className="hover:text-[#00333c] transition-transform active:scale-95 duration-200"
              >
                {profilePic ? (
                  <img
                    src={`${IMAGE_BASE_URL}/profile_pictures/${profilePic}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-manrope uppercase tracking-widest hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-[#00333c] transition-transform active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined">person</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NewNavbar;
