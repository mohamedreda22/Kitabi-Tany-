import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MyStore</Link>
            </div>
            <nav className="nav">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="icons">
                <Link to="/cart" className="icon">
                    <FaShoppingCart />
                </Link>
                <Link to="/profile" className="icon">
                    <FaUserCircle />
                </Link>
            </div>
        </header>
    );
};

export default Header;
