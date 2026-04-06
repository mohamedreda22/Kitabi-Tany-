import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecentBooks } from "../../services/bookService";
import BookCard from "../../Component/Shared/BookCard";
import "./Home.css";

const Home = () => {
    const [recentBooks, setRecentBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentBooks = async () => {
          try {
            const data = await getRecentBooks();
            setRecentBooks(data || []);
          } catch (error) {
            console.error("Error fetching recent books:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRecentBooks();
      }, []);

  return (
    <div className="home-container" dir="rtl">
      {/* Hero Section */}
      <header className="hero-header">
        <div className="hero-content">
          <h1>مكتبتك الثانية تنتظرك</h1>
          <p>أعطِ كتبك حياة جديدة، واكتشف كنوزاً أدبية بأسعار مذهلة.</p>
          <div className="auth-buttons">
            <Link to="/register" className="btn-primary">ابدأ الآن مجاناً</Link>
            <Link to="/login" className="btn-secondary">تسجيل الدخول</Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
            <span className="stat-number">+1000</span>
            <span className="stat-label">كتاب متاح</span>
        </div>
        <div className="stat-item">
            <span className="stat-number">+500</span>
            <span className="stat-label">قارئ سعيد</span>
        </div>
        <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">دعم فني</span>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="recommendations-section">
        <div className="section-header">
            <h2>أحدث الإضافات</h2>
            <p>إليك أحدث الكتب التي تمت إضافتها مؤخراً للمنصة</p>
        </div>
        <div className="book-list">
          {loading ? (
            <div className="spinner"></div>
          ) : recentBooks.length > 0 ? (
            recentBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <div className="no-data">
                <p>لا توجد كتب مقترحة حالياً.</p>
                <Link to="/register" className="btn-primary">كن أول من يضيف كتاباً!</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
