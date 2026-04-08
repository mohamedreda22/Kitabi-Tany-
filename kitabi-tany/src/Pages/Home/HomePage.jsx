import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getAllBooks } from "../../services/bookService";
import { getCart, addToCart, removeFromCart } from "../../services/cartService";
import { IMAGE_BASE_URL } from "../../services/axiosInstance";
import { placeOrder } from "../../services/ordersService";
import Swal from "sweetalert2";
import NewNavbar from "../../Component/Shared/NewNavbar";
import NewFooter from "../../Component/Shared/NewFooter";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const userRole = Cookies.get("userRole");
  const location = useLocation();

  const conditions = ["جديد", "مثل الجديد", "جيد", "مقبول"];

  useEffect(() => {
    fetchBooks();
    if (userRole === "buyer") {
      fetchCart();
    }
  }, [userRole, location.search]);

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

  const handleConditionChange = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const filteredBooks = books.filter((book) => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get("category");

    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = book.price <= priceRange;
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(book.condition);
    const matchesCategory = !categoryFilter || book.category === categoryFilter;

    return matchesSearch && matchesPrice && matchesCondition && matchesCategory;
  });

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
    <div className="bg-surface text-on-surface font-manrope selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      <NewNavbar />

      {/* Cart Drawer Toggle (If Buyer) */}
      {userRole === "buyer" && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={toggleCart}
            className="bg-primary text-on-primary p-4 rounded-full shadow-2xl hover:scale-110 transition-transform relative"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cart?.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-error text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cart.items.length}
              </span>
            )}
          </button>
          {cartOpen && (
            <div className="absolute bottom-20 right-0 w-80 bg-surface-container-lowest p-6 rounded-2xl shadow-2xl border border-outline-variant/20">
              <h3 className="font-notoSerif text-lg mb-4 text-primary">
                سلة التسوق
              </h3>
              {cart && cart.items.length > 0 ? (
                <>
                  <div className="max-h-60 overflow-y-auto space-y-4 mb-4 hide-scrollbar">
                    {cart.items.map((item) => (
                      <div
                        key={item.book?._id}
                        className="flex justify-between items-center gap-4"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary line-clamp-1">
                            {item.book?.title}
                          </p>
                          <p className="text-xs text-outline">
                            {item.book?.price} ج.م
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.book?._id)}
                          className="text-error hover:scale-110 transition-transform"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold">الإجمالي:</span>
                      <span className="text-lg font-bold text-primary">
                        {calculateTotalPrice()} جنيه
                      </span>
                    </div>
                    <button
                      className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                      onClick={handleOrder}
                    >
                      إتمام الطلب
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">
                    shopping_cart_off
                  </span>
                  <p className="text-sm text-outline">السلة فارغة حالياً</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <main className="pt-32 pb-20 px-8 max-w-screen-2xl mx-auto flex gap-12" dir="rtl">
        {/* Sidebar Filters */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-32 space-y-10">
            <div className="space-y-4">
              <h3 className="font-notoSerif text-xl font-bold text-primary">تصفية النتائج</h3>
              <div className="h-px bg-outline-variant/20"></div>
            </div>
            {/* Search Input */}
            <div className="space-y-4">
               <label className="text-sm font-semibold uppercase tracking-widest text-outline">البحث</label>
               <input
                 type="text"
                 className="w-full bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-primary-container text-on-surface placeholder-on-surface-variant/60 font-manrope text-sm p-3"
                 placeholder="اسم الكتاب أو المؤلف..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            {/* Price Range */}
            <div className="space-y-4">
              <label className="text-sm font-semibold uppercase tracking-widest text-outline">نطاق السعر</label>
              <div className="space-y-2">
                <input
                  className="w-full accent-primary h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer"
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-xs font-medium text-on-surface-variant" dir="ltr">
                  <span>0 ج.م</span>
                  <span>{priceRange.toLocaleString()} ج.م</span>
                </div>
              </div>
            </div>
            {/* Condition */}
            <div className="space-y-4">
              <label className="text-sm font-semibold uppercase tracking-widest text-outline">الحالة</label>
              <div className="flex flex-col gap-3">
                {conditions.map((cond) => (
                  <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded-sm border-outline-variant text-primary focus:ring-primary h-4 w-4"
                      type="checkbox"
                      checked={selectedConditions.includes(cond)}
                      onChange={() => handleConditionChange(cond)}
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">{cond}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Listing Content */}
        <section className="flex-grow">
          {/* Header & Sorting */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="font-notoSerif text-4xl md:text-5xl font-light text-primary leading-tight">المكتبة</h1>
              <p className="text-on-surface-variant font-manrope mt-2">اكتشف {filteredBooks.length} من الكنوز الأدبية المختارة</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-outline font-semibold">ترتيب حسب:</span>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium border-b-2 border-transparent hover:border-primary pb-1 transition-all">
                  وصل حديثاً
                  <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                </button>
              </div>
            </div>
          </div>

          {/* Responsive Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {filteredBooks.map((book) => (
                <div key={book._id} className="group cursor-pointer">
                  <Link to={`/book/${book._id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface-container-low mb-6 transition-transform duration-500 group-hover:-translate-y-2">
                      <img
                        className="w-full h-full object-cover"
                        alt={book.title}
                        src={book.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${book.coverPhoto}` : "https://via.placeholder.com/300x400?text=No+Cover"}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-secondary-container/90 backdrop-blur-md text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {book.condition}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                    </div>
                  </Link>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <Link to={`/book/${book._id}`}>
                        <h2 className="font-notoSerif text-xl text-primary leading-snug group-hover:underline decoration-primary/30 underline-offset-4 line-clamp-1">
                          {book.title}
                        </h2>
                      </Link>
                      <span className="font-manrope font-bold text-primary whitespace-nowrap">{book.price} ج.م</span>
                    </div>
                    <p className="text-sm text-on-surface-variant">{book.author}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex text-tertiary-container">
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="material-symbols-outlined text-xs">star</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-outline font-bold">4.8</span>
                      </div>
                      {userRole === 'buyer' && (
                        <button
                          onClick={() => handleAddToCart(book._id)}
                          className="bg-primary text-on-primary p-2 rounded-full hover:scale-110 transition-transform shadow-md"
                        >
                          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
              <h3 className="text-xl font-notoSerif text-primary mb-2">لا يوجد كتب</h3>
              <p className="text-on-surface-variant">حاول تغيير خيارات البحث أو التصفية.</p>
            </div>
          )}

          {/* Pagination */}
          <nav className="mt-24 flex items-center justify-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold shadow-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">3</button>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface hover:bg-primary hover:text-on-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          </nav>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default HomePage;
