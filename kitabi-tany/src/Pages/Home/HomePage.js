import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Fetch books from the backend API
    fetch("http://localhost:5000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));

    // Fetch cart data from the backend
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else {
        console.error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

/*   const addToCart = async (bookId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        fetchCart(); // Refresh cart data
        alert("تمت إضافة الكتاب إلى العربة بنجاح");
      } else {
        const error = await response.json();
        alert(`فشل في إضافة الكتاب: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("حدث خطأ أثناء إضافة الكتاب إلى العربة");
    }
  }; */
  const addToCart = async (bookId) => {
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
        console.log("Add to cart response:", result); // Log the response
        if (response.ok) {
            fetchCart(); // Refresh cart data
            alert("تمت إضافة الكتاب إلى العربة بنجاح");
        } else {
            alert(`فشل في إضافة الكتاب: ${result.message}`);
        }
    } catch (error) {
        console.error("Error adding book to cart:", error);
        alert("حدث خطأ أثناء إضافة الكتاب إلى العربة");
    }
};

  const removeFromCart = async (bookId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        fetchCart(); // Refresh cart data
        alert("تمت إزالة الكتاب من العربة بنجاح");
      } else {
        const error = await response.json();
        alert(`فشل في إزالة الكتاب: ${error.message}`);
      }
    } catch (error) {
      console.error("Error removing book from cart:", error);
      alert("حدث خطأ أثناء إزالة الكتاب من العربة");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalPrice = () => {
    return cart?.items.reduce((total, item) => total + item.book.price * item.quantity, 0) || 0;
  };

  const handleOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order/placeOrder", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.ok) {
        fetchCart(); // Refresh cart data
        alert("تمت عملية الشراء بنجاح");
      } else {
        const error = await response.json();
        alert(`فشل في عملية الشراء: ${error.message}`);
      }
    } catch (error) {
      console.error("Error ordering books:", error);
      alert("حدث خطأ أثناء عملية الشراء");
    }
  };

  return (
    <div className="container" style={{ direction: "rtl" }}>
      <div className="cart">
        <button onClick={toggleCart} className="cart-button">
          <img src="/cart.png" alt="Cart" className="cart-icon" />
          <span>{cart?.items.length || 0}</span>
        </button>
        {cartOpen && (
          <div className="cart-popup">
            <h3>عربة التسوق</h3>
            {cart && cart.items.length > 0 ? (
              <>
                <div>
                  {cart.items.map((item) => (
                    <div key={item.book._id}>
                      <span>{item.book.title}</span>&nbsp;
                      <span>{item.book.price} جنيه</span> &nbsp;
                      <button onClick={() => removeFromCart(item.book._id)} className="delete-btn" >
                        إزالة
                      </button>
                    </div>
                  ))}
                </div>
                <p>المجموع: {calculateTotalPrice()} جنيه</p>
                <button className="btn" onClick={handleOrder}>إتمام الشراء</button>
              </>
            ) : (
              <p>لم يتم إضافة أي كتب بعد.</p>
            )}
          </div>
        )}
      </div>

      <header>
        <h1>مرحبًا بك في اقرأ تاني</h1>
        <p>استعرض أفضل الكتب بأحدث الإضافات.</p>
      </header>

      <section className="section">
        <h2>أحدث الكتب المضافة</h2>
        <button className="btns">
          <a href="/add-book">إضافة كتاب جديد</a>
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
                      : "/My_LOGO.jpg"
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
              <button onClick={() => addToCart(book._id)} className="btn">أضف إلى العربة</button>
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
