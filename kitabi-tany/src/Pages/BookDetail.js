import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookDetail.css";
import Cookies from 'js-cookie';


const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState(null);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const day = dateTime.getDate();
    const month = dateTime.toLocaleString('default', { month: 'long' });
    return { day, month };
};


  const userData = async (sellerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSeller(data.username);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
        

  const addToCart = async () => {
    setLoading(true); // Disable button
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ bookId }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("تمت إضافة الكتاب إلى القائمة بنجاح");
      } else {
        alert(`فشل في إضافة الكتاب: ${result.message}`);
      }
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("حدث خطأ أثناء إضافة الكتاب إلى القائمة");
    } finally {
      setLoading(false); // Enable button
    }
  };
  useEffect(() => {
    if (book && book.seller) {
      userData(book.seller);
    }
  }, [book]);
  
  useEffect(() => {
    // Fetch book details
    fetch(`http://localhost:5000/api/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }
  const { day, month } = book.createdAt ? formatDateTime(book.createdAt) : { day: "", month: "" };

  return (
    <div className="book-detail-container">
      <div className="top-section">
        <div className="image-section">
          <img
            src={book.coverPhoto ? `http://localhost:5000/cover_books/${book.coverPhoto}` : "/placeholder.jpg"}
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
          {Cookies.get("userRole") === "buyer" && (
            <button
            className="add-to-cart-btn"
            onClick={addToCart}
            disabled={loading}
          >
            {loading ? "جار الإضافة..." : "أضف إلى القائمة"}
          </button>
          )}

        </div>
      </div>

      <div className="description-section">
        <h2>الوصف</h2>
        <p>{book.description}</p>
      </div>

      <div className="additional-info">
        <p><strong>الحالة:</strong> {book.condition}</p>
        <div className="book-card-date" >
                        <span className="day">{day}</span> 
                        <span className="event-card-month">{month}</span>
        </div>
        <p><strong>الناشر:</strong> {seller || "غير متوفر"}</p>
      </div>

      <div className="actions-section">
        <button className="back-btn" onClick={() => window.history.back()}>رجوع</button>
      </div>
    </div>
  );
};

export default BookDetail;
