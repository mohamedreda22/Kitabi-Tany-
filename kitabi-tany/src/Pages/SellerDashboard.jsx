import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getBooksBySeller, deleteBook } from "../services/bookService";
import { IMAGE_BASE_URL } from "../services/axiosInstance";
import Swal from "sweetalert2";
import NewNavbar from "../Component/Shared/NewNavbar";
import NewFooter from "../Component/Shared/NewFooter";

const SellerDashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSellerBooks();
    }, []);

    const fetchSellerBooks = async () => {
        try {
            const data = await getBooksBySeller();
            setBooks(data || []);
        } catch (error) {
            console.error("Error fetching seller books:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#00333c",
                cancelButtonColor: "#ba1a1a",
                confirmButtonText: "Yes, delete it!"
            });

            if (confirm.isConfirmed) {
                await deleteBook(bookId);
                setBooks(books.filter(b => b._id !== bookId));
                Swal.fire("Deleted!", "Your listing has been removed.", "success");
            }
        } catch (error) {
            Swal.fire("Error", "Failed to delete the book", "error");
        }
    };

    const totalEarnings = books.filter(b => b.sold).reduce((sum, b) => sum + b.price, 0);
    const soldBooksCount = books.filter(b => b.sold).length;
    const activeListingsCount = books.filter(b => !b.sold).length;

    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen">
            <NewNavbar />

            <main className="pt-32 pb-20 max-w-screen-2xl mx-auto px-8 flex gap-12">
                {/* Sidebar Navigation */}
                <aside className="w-64 flex-shrink-0 hidden lg:block">
                    <div className="sticky top-32 space-y-10">
                        <div className="space-y-4">
                            <h1 className="font-notoSerif text-2xl font-bold text-primary">Seller Studio</h1>
                            <div className="h-px bg-outline-variant/20"></div>
                        </div>
                        <nav className="space-y-4">
                            <Link className="flex items-center gap-3 p-3 bg-surface-container-highest text-primary rounded-xl font-bold transition-all duration-200" to="/seller-dashboard">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm">Manage Collection</span>
                            </Link>
                            <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-xl" to="/add-book">
                                <span className="material-symbols-outlined">add_circle</span>
                                <span className="text-sm">List New Book</span>
                            </Link>
                            <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-xl" to="/orders">
                                <span className="material-symbols-outlined">analytics</span>
                                <span className="text-sm">Sales Overview</span>
                            </Link>
                        </nav>
                        <div className="p-6 bg-primary rounded-2xl text-on-primary">
                            <h4 className="font-bold mb-2">Seller Tip</h4>
                            <p className="text-xs opacity-80 leading-relaxed">High-quality photos of the book spine and corners increase sale probability by 40%.</p>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-grow">
                    <header className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-tertiary-container font-bold text-xs tracking-widest uppercase mb-2 block">Your Catalog</span>
                            <h2 className="font-notoSerif text-4xl text-primary italic leading-tight">Managing your collection.</h2>
                        </div>
                        <Link to="/add-book" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                            <span className="material-symbols-outlined">add</span>
                            List a Book
                        </Link>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
                            <span className="material-symbols-outlined absolute -right-4 -top-4 text-primary/5 !text-9xl">auto_stories</span>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Active Listings</p>
                            <p className="font-notoSerif text-3xl text-primary">{activeListingsCount}</p>
                        </div>
                        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
                            <span className="material-symbols-outlined absolute -right-4 -top-4 text-primary/5 !text-9xl">sell</span>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Books Sold</p>
                            <p className="font-notoSerif text-3xl text-primary">{soldBooksCount}</p>
                        </div>
                        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
                            <span className="material-symbols-outlined absolute -right-4 -top-4 text-primary/5 !text-9xl">payments</span>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Earnings</p>
                            <p className="font-notoSerif text-3xl text-primary">{totalEarnings} EGP</p>
                        </div>
                    </div>

                    {/* Book List */}
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
                        <h3 className="font-notoSerif text-2xl text-primary italic mb-8">My Listings</h3>

                        {loading ? (
                             <div className="flex justify-center py-12"><div className="spinner"></div></div>
                        ) : books.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-outline-variant/20">
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Book Details</th>
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Price</th>
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Status</th>
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/10">
                                        {books.map((book) => (
                                            <tr key={book._id} className="group hover:bg-surface-container-low transition-colors">
                                                <td className="py-6 flex items-center gap-4">
                                                    <div className="w-12 h-16 bg-surface-container-high rounded overflow-hidden flex-shrink-0 shadow-sm">
                                                        <img
                                                            src={book.coverPhoto ? `${IMAGE_BASE_URL}/cover_books/${book.coverPhoto}` : "https://via.placeholder.com/150"}
                                                            alt={book.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-primary mb-1">{book.title}</h4>
                                                        <p className="text-xs text-outline font-medium">{book.author} • {book.category}</p>
                                                    </div>
                                                </td>
                                                <td className="py-6">
                                                    <span className="text-sm font-bold text-primary">{book.price} EGP</span>
                                                </td>
                                                <td className="py-6">
                                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${book.sold ? 'bg-error/10 text-error' : 'bg-secondary-container/30 text-secondary'}`}>
                                                        {book.sold ? 'Sold' : 'Active'}
                                                    </span>
                                                </td>
                                                <td className="py-6">
                                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link to={`/book/${book._id}`} className="text-primary hover:scale-110 transition-transform">
                                                            <span className="material-symbols-outlined text-xl">visibility</span>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(book._id)}
                                                            className="text-error hover:scale-110 transition-transform"
                                                        >
                                                            <span className="material-symbols-outlined text-xl">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-on-surface-variant">You haven't listed any books yet.</p>
                                <Link to="/add-book" className="text-primary font-bold hover:underline mt-2 inline-block">List your first book now</Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <NewFooter />
        </div>
    );
};

export default SellerDashboard;
