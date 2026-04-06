import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getBookById } from "../services/bookService";
import { addToCart } from "../services/cartService";
import { getUserById } from "../services/userService";
import { IMAGE_BASE_URL } from "../services/axiosInstance";
import "./BookDetail.css";

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sellerName, setSellerName] = useState("");

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString('ar-EG', { month: 'long' });
    return { day, month };
  };

  useEffect(() => {
    const fetchBookAndSeller = async () => {
      try {
        const bookData = await getBookById(bookId);
        setBook(bookData);
        if (bookData.seller) {
          const sellerData = await getUserById(bookData.seller);
          setSellerName(sellerData.username);
        }
      } catch (error) {
        console.error("Error fetching book/seller:", error);
      }
    };
    fetchBookAndSeller();
  }, [bookId]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(bookId);
      Swal.fire({
          icon: 'success',
          title: 'تمت الإضافة',
          text: 'تمت إضافة الكتاب إلى العربة بنجاح',
          timer: 1500,
          showConfirmButton: false
      });
    } catch (error) {
      Swal.fire('خطأ', error.message || 'حدث خطأ أثناء إضافة الكتاب', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return <div className="spinner"></div>;
  }

  const { day, month } = book.createdAt ? formatDateTime(book.createdAt) : { day: "", month: "" };

  return (
    <div className="book-detail-container" dir="rtl">
      <div className="page-header-actions">
            <button className="btn-back" onClick={() => navigate(-1)}>رجوع</button>
      </div>
      <div className="top-section">
        <div className="image-section">
          <img
            src={book.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${book.coverPhoto}` : "/My_Logo.jpg"}
            alt={book.title}
            className="detail-img"
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
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? "جار الإضافة..." : "أضف إلى العربة"}
            </button>
          )}
        </div>
      </div>

      <div className="description-section">
        <h2>الوصف</h2>
        <p>{book.description || "لا يوجد وصف لهذا الكتاب."}</p>
      </div>

      <div className="additional-info">
        <div className="info-item">
          <span className="info-label">الحالة</span>
          <span className="info-value">{book.condition}</span>
        </div>
        <div className="info-item">
          <span className="info-label">تاريخ النشر</span>
          <div className="book-date">
              <span className="day">{day}</span>
              <span className="month">{month}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-label">الناشر</span>
          <span className="info-value">{sellerName || "غير متوفر"}</span>
        </div>
      </div>

    </div>
  );
};

export default BookDetail;
