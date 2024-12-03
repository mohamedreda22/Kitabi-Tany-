import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useEffect,useState } from "react";
import axios from "axios";

const Home = () => {
    const [recentBooks, setRecentBooks] = useState([]);
    useEffect(() => {
        const fetchRecentBooks = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/books/recent");
            setRecentBooks(response.data);
          } catch (error) {
            console.error("Error fetching recent books:", error);
          }
        };
    
        fetchRecentBooks();
      }, []);
  return (
    <div className="home-container" dir="rtl">
      {/* Hero Section */}
      <header className="hero-header">
        <div className="hero-content">
          <h1>مرحبًا بك في كتابي تاني!</h1>
          <p>اكتشف كتابك المفضل التالي وانضم إلى مكتبتنا المتنوعة.</p>
          <div className="auth-buttons">
            <Link to="/register" className="btn btn-primary">إنشاء حساب</Link>
            <Link to="/login" className="btn btn-secondary">تسجيل الدخول</Link>
          </div>
        </div>
      </header>

 {/* Recommendations Section */}
 <section className="recommendations-section">
        <h2>اقتراحات الكتب</h2>
        <p>إليك بعض الكتب التي قد تروق لك:</p>
        <div className="book-list">
          {recentBooks.length > 0 ? (
            recentBooks.map((book) => (
              <div key={book._id} className="book-card">
                <img
                  src={book.coverPhoto ? `http://localhost:5000/cover_books/${book.coverPhoto}` : "/placeholder.jpg"}
                  alt={book.title}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <Link to={`/book/${book._id}`} className="btn btn-details">عرض التفاصيل</Link>
              </div>
            ))
          ) : (
            <p>لا توجد كتب مقترحة حالياً.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
