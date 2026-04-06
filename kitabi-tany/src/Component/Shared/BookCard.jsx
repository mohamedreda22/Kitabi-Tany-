import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL } from '../../services/axiosInstance';
import './BookCard.css';

const BookCard = ({ book, onAddToCart, showAddToCart = false }) => {
    const { _id, title, author, price, condition, category, coverPhoto } = book;

    const imageUrl = coverPhoto
        ? `${IMAGE_BASE_URL}/cover_books/${coverPhoto}`
        : "/My_Logo.jpg";

    return (
        <div className="book-card" dir="rtl">
            <Link to={`/book/${_id}`} className="book-card-link">
                <div className="book-card-image">
                    <img src={imageUrl} alt={title} className="cover-img" />
                </div>
                <div className="book-card-info">
                    <h3 className="book-title" title={title}>{title}</h3>
                    <p className="book-author">المؤلف: {author}</p>
                    <p className="book-category">التصنيف: {category}</p>
                    <div className="book-details">
                        <span className="book-condition">{condition}</span>
                        <span className="book-price">{price} جنيه</span>
                    </div>
                </div>
            </Link>
            {showAddToCart && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(_id);
                    }}
                    className="add-to-cart-btn"
                >
                    أضف إلى العربة
                </button>
            )}
        </div>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        condition: PropTypes.string,
        category: PropTypes.string,
        coverPhoto: PropTypes.string,
    }).isRequired,
    onAddToCart: PropTypes.func,
    showAddToCart: PropTypes.bool,
};

export default BookCard;
