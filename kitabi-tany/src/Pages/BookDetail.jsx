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
  if (!book) return <div className="text-center py-20">Book not found</div>;

  const userRole = Cookies.get("userRole");

  return (
    <div className="bg-surface text-on-surface font-manrope min-h-screen">
      <NewNavbar />

      <main className="pt-32 pb-20 max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center space-x-2 text-xs uppercase tracking-widest text-outline">
          <Link className="hover:text-primary" to="/">Home</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <Link className="hover:text-primary" to="/home">{book.category || 'Books'}</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-on-surface">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden rounded-xl group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={book.title}
                src={book.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${book.coverPhoto}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuCaS5A57VFik2eEuHF65N0kA8NxwyeFNTh-wrCWzWGNs2EkaBSTNQjOr63Xk0t7CWEgnRNXcjK7rSQzcjvCcTvmJj6N2bE8LgW_LOmnE2RUCuz290O_v4F4jX2XGeTX54O-6OP02l2YnTkGG7IH0SV8_S53RscF5mKleOft6PAGZvDCur-1ksEWeUsACv9IC5FCSEWcy08sHL24MaQkQ3F6OD5xt4VcF7_HM4y_kTaTWu2OUMCvRt_Im2P-0NJdWvr4q0V-AnD3V2Fl"}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl"></div>
            </div>
          </div>

          {/* Right Column: Details & CTA */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-32">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-tighter rounded-full mb-4">
                  {book.condition || 'Good Condition'}
                </span>
                <h1 className="text-5xl font-notoSerif text-primary leading-tight mb-2 italic">{book.title}</h1>
                <p className="text-xl font-manrope font-light text-secondary">{book.author}</p>
              </div>
              <div className="mb-8 flex items-baseline space-x-4">
                <span className="text-4xl font-manrope font-extrabold text-primary">{book.price} EGP</span>
              </div>
              <div className="mb-10 space-y-4">
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Description</h4>
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
                    Add to Cart
                  </button>
                )}
                <button className="w-full h-14 border-2 border-primary text-primary font-manrope font-bold rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined mr-2">
                    chat_bubble
                  </span>
                  Chat with Seller
                </button>
              </div>
              {/* Seller Profile Card */}
              <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)]">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      alt="Seller"
                      src={book.seller?.profilePicture ? `${IMAGE_BASE_URL}/profile_pictures/${book.seller.profilePicture}` : "/My_Logo.jpg"}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface">{book.seller?.username || 'Verified Seller'}</h5>
                    <div className="flex items-center text-xs text-secondary">
                      <span className="material-symbols-outlined text-xs mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      4.9 (Professional)
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-outline mb-6">
                  <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                  Ships from Egypt
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {recentBooks.length > 0 && (
          <section className="mt-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-tertiary-container mb-2 block">Curated Discovery</span>
                <h2 className="text-3xl font-notoSerif text-primary italic">You might also like</h2>
              </div>
              <Link className="text-sm font-bold text-primary flex items-center hover:translate-x-1 transition-transform" to="/home">
                Browse All <span className="material-symbols-outlined ml-1">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {recentBooks.map(b => (
                <Link key={b._id} className="group cursor-pointer" to={`/book/${b._id}`}>
                  <div className="bg-surface-container-low aspect-[2/3] rounded-xl overflow-hidden mb-4 relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={b.title} src={b.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${b.coverPhoto}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuA4pW-xktgI-4cw6CBzwAS2Reeb2wUnWbYF72an43eoTD05wBQL4wFGsY3eWJcCmDPxLgfIllqUA5SxXxs4ig9CKpVz3Bq82r_2GNJ80SfXo0t7uzFOwYoS7WR0j3aeYxCIGMzHH9SSr1M-xuuZ3CzEPfFD26zxFYsJj5G1er_vEjcHH_-azDMXW2hWIvyZz5fhvGky6pSewrMmGbgVj28ak9eLQX9ErP5RRBZi4RRo49nmjGO0lkRS756viOPMOzi7C9FIqFErb6JE"} />
                  </div>
                  <h3 className="font-notoSerif text-lg text-primary group-hover:underline decoration-primary/30 line-clamp-1">{b.title}</h3>
                  <p className="text-xs text-outline font-manrope">{b.author}</p>
                  <p className="text-sm font-bold text-primary mt-2">{b.price} EGP</p>
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
