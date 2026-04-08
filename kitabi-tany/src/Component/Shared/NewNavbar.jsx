import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../services/userService";
import { IMAGE_BASE_URL } from "../../services/axiosInstance";

const NewNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = Cookies.get("userRole");
  const profilePic = Cookies.get("profilePic");
  const token = Cookies.get("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/home?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const navLinks = [
    { name: "كلاسيكيات", path: "/home?category=تاريخية" },
    { name: "روايات", path: "/home?category=روايات" },
    { name: "كتب علمية", path: "/home?category=علمية" },
    { name: "كنوز نادرة", path: "/home?category=نادرة" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-surface/90 dark:bg-[#1b1c1a]/90 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
      dir="rtl"
    >
      <div className="flex justify-between items-center px-8 max-w-screen-2xl mx-auto">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-12">
          <Link
            to={token ? "/home" : "/"}
            className="text-2xl font-notoSerif font-bold italic text-primary dark:text-white transition-transform hover:scale-105"
          >
            كتابي تاني
          </Link>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse font-notoSerif tracking-tight">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  location.search.includes(encodeURIComponent(link.path.split('=')[1]))
                    ? "text-primary dark:text-white"
                    : "text-[#5c5e58] dark:text-[#91928d] hover:text-primary dark:hover:text-white"
                }`}
                to={link.path}
              >
                {link.name}
                <span className={`absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  location.search.includes(encodeURIComponent(link.path.split('=')[1])) ? "w-full" : ""
                }`}></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-6 space-x-reverse text-primary dark:text-[#bae8f0]">
          {/* Search Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-primary/5 transition-colors"
              title="بحث"
            >
              <span className="material-symbols-outlined !text-2xl">
                {isSearchOpen ? "close" : "search"}
              </span>
            </button>

            {/* Expanded Search Bar */}
            <div className={`absolute top-full left-0 mt-4 transition-all duration-300 origin-top-left ${
              isSearchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}>
              <form onSubmit={handleSearchSubmit} className="flex bg-surface-container-highest rounded-full shadow-xl p-1 border border-outline-variant/20 w-72">
                <input
                  type="text"
                  placeholder="دور على كتابك..."
                  className="bg-transparent border-none focus:ring-0 text-sm px-4 py-2 w-full font-manrope"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus={isSearchOpen}
                />
                <button type="submit" className="bg-primary text-on-primary p-2 rounded-full">
                  <span className="material-symbols-outlined !text-xl">search</span>
                </button>
              </form>
            </div>
          </div>

          {token ? (
            <div className="flex items-center gap-6">
              {userRole === "buyer" && (
                <Link
                  to="/home"
                  className="p-2 rounded-full hover:bg-primary/5 transition-colors relative group"
                  title="سلة المشتريات"
                >
                  <span className="material-symbols-outlined !text-2xl">shopping_cart</span>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                </Link>
              )}

              <div className="h-8 w-px bg-outline-variant/30 hidden sm:block"></div>

              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-1 pr-3 rounded-full bg-surface-container-high/50 hover:bg-surface-container-high transition-all group border border-outline-variant/10 shadow-sm"
                >
                  <span className="text-xs font-bold hidden sm:block group-hover:text-primary transition-colors">حسابي</span>
                  {profilePic ? (
                    <img
                      src={`${IMAGE_BASE_URL}/profile_pictures/${profilePic}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined !text-xl">person</span>
                    </div>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-error/5 text-outline hover:text-error transition-all"
                  title="تسجيل الخروج"
                >
                  <span className="material-symbols-outlined !text-2xl">logout</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              <span className="material-symbols-outlined !text-xl">login</span>
              دخول
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined !text-3xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-surface border-t border-outline-variant/10 transition-all duration-300 shadow-2xl overflow-hidden ${
        isMenuOpen ? "max-h-[500px] opacity-100 py-8" : "max-h-0 opacity-0"
      }`}>
        <div className="flex flex-col items-center space-y-6 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              className="text-lg font-medium text-primary w-full text-center py-2"
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full h-px bg-outline-variant/10"></div>
          {token && userRole === 'seller' && (
            <Link to="/seller-dashboard" className="text-primary font-bold">لوحة البائع</Link>
          )}
          {token && userRole === 'admin' && (
            <Link to="/admin-dashboard" className="text-primary font-bold">لوحة الإدارة</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NewNavbar;
