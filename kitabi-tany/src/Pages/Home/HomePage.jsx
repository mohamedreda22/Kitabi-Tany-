import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getAllBooks } from "../../services/bookService";
import { getCart, addToCart, removeFromCart } from "../../services/cartService";
import { placeOrder } from "../../services/ordersService";
import BookCard from "../../Component/Shared/BookCard";
import Swal from 'sweetalert2';
import "./HomePage.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const userRole = Cookies.get("userRole");

  useEffect(() => {
    fetchBooks();
    if (userRole === "buyer") {
      fetchCart();
    }
  }, [userRole]);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      await addToCart(bookId);
      fetchCart();
      Swal.fire({
        icon: 'success',
        title: 'تمت الإضافة بنجاح',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire('خطأ', 'حدث خطأ أثناء إضافة الكتاب للعربة', 'error');
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      await removeFromCart(bookId);
      fetchCart();
      Swal.fire({
        icon: 'success',
        title: 'تمت الإزالة بنجاح',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire('خطأ', 'حدث خطأ أثناء إزالة الكتاب', 'error');
    }
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalPrice = () => {
    return cart?.items.reduce((total, item) => total + (item.book?.price || 0) * item.quantity, 0) || 0;
  };

  const handleOrder = async () => {
    try {
      await placeOrder();
      fetchCart();
      setCartOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'تمت عملية الشراء بنجاح',
        text: 'شكراً لك على ثقتك بكتابي تاني!',
        confirmButtonColor: '#2e7d32'
      });
    } catch (error) {
      Swal.fire('خطأ', 'حدث خطأ أثناء إتمام الطلب', 'error');
    }
  };

  return (
    <div className="homepage-container" dir="rtl">
      <div className="homepage-header-actions">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="ابحث بالعنوان، المؤلف، أو التصنيف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="action-buttons">
            {userRole === "buyer" && (
            <div className="cart-wrapper">
                <button onClick={toggleCart} className="cart-toggle-btn">
                <i className="fas fa-shopping-basket"></i>
                <span className="cart-count">{cart?.items.length || 0}</span>
                <span className="cart-text">السلة</span>
                </button>
                {cartOpen && (
                <div className="cart-dropdown">
                    <h3>سلة التسوق</h3>
                    {cart && cart.items.length > 0 ? (
                    <>
                        <div className="cart-items-list">
                        {cart.items.map((item) => (
                            <div key={item.book?._id} className="cart-item-row">
                                <div className="cart-item-info">
                                    <span className="item-title">{item.book?.title}</span>
                                    <span className="item-price">{item.book?.price} ج.م</span>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.book?._id)} className="remove-item-btn">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))}
                        </div>
                        <div className="cart-footer">
                            <div className="total-amount">
                                <span>الإجمالي:</span>
                                <strong>{calculateTotalPrice()} جنيه</strong>
                            </div>
                            <button className="checkout-btn" onClick={handleOrder}>إتمام الطلب</button>
                        </div>
                    </>
                    ) : (
                    <div className="empty-cart">
                        <i className="fas fa-shopping-cart"></i>
                        <p>السلة فارغة حالياً</p>
                    </div>
                    )}
                </div>
                )}
            </div>
            )}

            {userRole === "seller" && (
            <Link to="/add-book" className="add-book-nav-btn">
                <i className="fas fa-plus"></i>
                إضافة كتاب
            </Link>
            )}
        </div>
      </div>

      <header className="page-intro">
        <h1>استكشف مجموعتنا</h1>
        <p>تصفح آلاف الكتب المستعملة بجودة ممتازة</p>
      </header>

      <section className="books-grid-section">
        {filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onAddToCart={handleAddToCart}
                showAddToCart={userRole === "buyer"}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>لا توجد نتائج لبحثك</h3>
            <p>جرب كلمات بحث أخرى</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
