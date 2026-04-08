import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById, getRecentBooks } from "../services/bookService";
import { addToCart } from "../services/cartService";
import { IMAGE_BASE_URL } from "../services/axiosInstance";
import Swal from "sweetalert2";
import NewNavbar from "../Component/Shared/NewNavbar";
import NewFooter from "../Component/Shared/NewFooter";
import Cookies from "js-cookie";

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookData = await getBookById(bookId);
        setBook(bookData);
        const recentData = await getRecentBooks();
        setRecentBooks(recentData.filter(b => b._id !== bookId).slice(0, 4));
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [bookId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(bookId);
      Swal.fire({
        icon: "success",
        title: "تمت الإضافة للسلة",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("خطأ", "حدث خطأ أثناء إضافة الكتاب", "error");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="spinner"></div></div>;
  if (!book) return <div className="text-center py-20">الكتاب مش موجود</div>;

  const userRole = Cookies.get("userRole");

  return (
    <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
      <NewNavbar />

      <main className="pt-32 pb-20 max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center space-x-2 space-x-reverse text-xs uppercase tracking-widest text-outline">
          <Link className="hover:text-primary" to="/">الرئيسية</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_left</span>
          <Link className="hover:text-primary" to="/home">{book.category || 'كتب'}</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_left</span>
          <span className="text-on-surface">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Right Column (Gallery for RTL) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden rounded-xl group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={book.title}
                src={book.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${book.coverPhoto}` : "https://via.placeholder.com/600x800?text=No+Cover"}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl"></div>
            </div>
          </div>

          {/* Left Column: Details & CTA */}
          <div className="lg:col-span-5 flex flex-col text-right">
            <div className="sticky top-32">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-tighter rounded-full mb-4">
                  {book.condition}
                </span>
                <h1 className="text-5xl font-notoSerif text-primary leading-tight mb-2 italic">{book.title}</h1>
                <p className="text-xl font-manrope font-light text-secondary">{book.author}</p>
              </div>
              <div className="mb-8 flex items-baseline space-x-4 space-x-reverse">
                <span className="text-4xl font-manrope font-extrabold text-primary">{book.price} ج.م</span>
              </div>
              <div className="mb-10 space-y-4">
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">وصف الكتاب</h4>
                  </div>
                  <p className="text-sm text-outline leading-relaxed">{book.description}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 mb-12">
                {userRole === "buyer" && (
                  <button
                    onClick={handleAddToCart}
                    className="w-full h-14 bg-primary text-on-primary font-manrope font-bold rounded-lg flex items-center justify-center hover:bg-primary-container transition-all shadow-xl shadow-primary/10"
                  >
                    أضف للسلة
                  </button>
                )}
                <button className="w-full h-14 border-2 border-primary text-primary font-manrope font-bold rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined ml-2">
                    chat_bubble
                  </span>
                  كلم البائع
                </button>
              </div>
              {/* Seller Profile Card */}
              <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)]">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      alt="Seller"
                      src={book.seller?.profilePicture ? `${IMAGE_BASE_URL}/profile_pictures/${book.seller.profilePicture}` : "/My_Logo.jpg"}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface">{book.seller?.username || 'بائع موثوق'}</h5>
                    <div className="flex items-center text-xs text-secondary">
                      <span className="material-symbols-outlined text-xs ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      4.9 (ممتاز)
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-outline mb-6">
                  <span className="material-symbols-outlined text-xs ml-1">location_on</span>
                  يشحن من مصر
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {recentBooks.length > 0 && (
          <section className="mt-32">
            <div className="flex justify-between items-end mb-12 text-right">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-tertiary-container mb-2 block">اكتشافات مختارة</span>
                <h2 className="text-3xl font-notoSerif text-primary italic">ممكن يعجبك برضه</h2>
              </div>
              <Link className="text-sm font-bold text-primary flex items-center hover:translate-x-[-4px] transition-transform" to="/home">
                تصفح الكل <span className="material-symbols-outlined mr-1">arrow_back</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {recentBooks.map(b => (
                <Link key={b._id} className="group cursor-pointer text-right" to={`/book/${b._id}`}>
                  <div className="bg-surface-container-low aspect-[2/3] rounded-xl overflow-hidden mb-4 relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={b.title} src={b.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${b.coverPhoto}` : "https://via.placeholder.com/300x450?text=No+Cover"} />
                  </div>
                  <h3 className="font-notoSerif text-lg text-primary group-hover:underline decoration-primary/30 line-clamp-1">{b.title}</h3>
                  <p className="text-xs text-outline font-manrope">{b.author}</p>
                  <p className="text-sm font-bold text-primary mt-2">{b.price} ج.م</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <NewFooter />
    </div>
  );
};

export default BookDetail;
