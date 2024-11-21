import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookDetail.css";

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

/*   const addToCart = () => {
    const existingCartItems = [...cartItems];

    // Check if the book is already in the cart
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.id === book.id
    );

    if (existingItemIndex > -1) {
      // If the item exists, increase its quantity
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      // Otherwise, add a new item with quantity 1
      existingCartItems.push({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      });
    }

    // Update state and localStorage
    setCartItems(existingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    alert("تمت إضافة الكتاب إلى القائمة بنجاح");
  }; */

  const addToCart = () => {
    const existingCartItems = [...cartItems];
  
    // Check if the book is already in the cart
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.id === book.id
    );
  
    if (existingItemIndex > -1) {
      // If the item exists, increase its quantity
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      // Otherwise, add a new item with quantity 1
      existingCartItems.push({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      });
    }
  
    // Update state and localStorage
    setCartItems(existingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    alert("تمت إضافة الكتاب إلى القائمة بنجاح");
  };
  
  const toggleCart = () => {
    setCartVisible(!cartVisible); // Toggle cart visibility
  };

  useEffect(() => {
    // Fetch book details from the API
    fetch(`http://localhost:5000/api/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));

    // Load cart items from localStorage on component mount
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail-container">
      {/* Cart Icon */}
      <div className="cart-icon" onClick={toggleCart}>
        🛒 <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
      </div>

      {/* Cart Window */}
      {cartVisible && (
        <div className="cart-window">
          <h3>سلة التسوق</h3>
          {cartItems.length > 0 ? (
            <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - {item.price} جنيه × {item.quantity}
              </li>
            ))}

            </ul>
          ) : (
            <p>سلة التسوق فارغة</p>
          )}
          <button onClick={toggleCart}>إغلاق</button>
        </div>
      )}

      {/* Top Section */}
      <div className="top-section">
        <div className="image-section">
          <img
            src={
              book.coverPhoto
                ? `http://localhost:5000/cover_books/${book.coverPhoto}`
                : "/placeholder.jpg"
            }
            alt={book.title}
          />
        </div>
        <div className="details-section">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">المؤلف: {book.author}</p>
          <p className="book-category">التصنيف: {book.category}</p>
          <div className="price-section">
            <p>السعر: <span className="price">{book.price} جنيه</span></p>
          </div>
          <button className="add-to-list-btn" onClick={addToCart}>
            أضف إلى القائمة
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <h2>الوصف</h2>
        <p>{book.description}</p>
      </div>

      {/* Additional Details */}
      <div className="additional-info">
        <p><strong>الحالة:</strong> {book.condition}</p>
        <p><strong>تاريخ النشر:</strong> {book.publishDate || "غير متوفر"}</p>
      </div>

      <div className="actions-section">
        <button className="back-btn" onClick={() => window.history.back()}>
          رجوع
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
