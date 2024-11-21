import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch books from the backend API
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ direction: "rtl" }}>
      <header>
        <h1>مرحبًا بك في اقرأ تاني</h1>
        <p>استعرض أفضل الكتب بأحدث الإضافات.</p>
      </header>

      <section className="section">
        <h2>أحدث الكتب المضافة</h2>
        <button className="btns">
          <a href="/add-book">اضافة كتاب جديد</a>
        </button>
      </section>

      <section className="section">
        <input
          type="text"
          placeholder="ابحث عن الكتب..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="cards">
          {filteredBooks.map((book) => (
            <div key={book._id} className="card">
              <Link to={`/book/${book._id}`}> 
                <img
                  src={
                    book.coverPhoto
                      ? `http://localhost:5000/cover_books/${book.coverPhoto}`
                      : "/My LOGO.jpg" // Fallback image if coverPhoto is missing
                  }
                  alt="Book cover"
                  className="cover"
                />
              <h3>{book.title}</h3>
              </Link>
              <p>المؤلف: {book.author}</p>
              <p>السعر: {book.price} جنيه</p>
              <p>الحالة: {book.condition}</p>
              <p>التصنيف: {book.category}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 اقرأ تاني - كل الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default HomePage;
