import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { createBook } from '../services/bookService';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    condition: "مثل الجديد",
    coverPhoto: "",
    category: "روايات",
  });

  const categories = [
    "روايات", "علمية", "تاريخية", "سيرة ذاتية", "رومانسية",
    "غموض", "خيال", "أطفال", "غير روائية", "مغامرات", "علم النفس"
  ];

  const conditions = ["جديد", "مثل الجديد", "جيد", "مقبول"];

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'يرجى تسجيل الدخول أولاً',
          confirmButtonColor: '#00333c',
      }).then(() => {
          navigate('/login');
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    setBook({ ...book, coverPhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(book.price) || book.price <= 0) {
      Swal.fire('خطأ', 'يرجى إدخال سعر صالح.', 'error');
      return;
    }

    if (!book.coverPhoto) {
      Swal.fire('خطأ', 'يرجى إضافة صورة الكتاب.', 'error');
      return;
    }

    try {
      await createBook(book);
      Swal.fire({
          icon: 'success',
          title: 'تم بنجاح',
          text: 'تمت إضافة الكتاب بنجاح!',
          timer: 1500,
          showConfirmButton: false
      });
      navigate("/seller-dashboard");
    } catch (error) {
      Swal.fire('فشل', error.message || 'حدث خطأ أثناء إضافة الكتاب.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
        <div className="bg-surface-container-low p-10 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)] border border-outline-variant/10">
            <header className="flex justify-between items-center mb-10">
                <h2 className="font-notoSerif text-3xl text-primary italic">إضافة كتاب جديد</h2>
                <Link to="/seller-dashboard" className="text-xs font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors">إلغاء</Link>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">اسم الكتاب</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                            value={book.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">اسم المؤلف</label>
                        <input
                            type="text"
                            name="author"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                            value={book.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">وصف الكتاب</label>
                    <textarea
                        name="description"
                        className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope min-h-[120px]"
                        value={book.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">السعر (ج.م)</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                            value={book.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">الحالة</label>
                        <select
                            name="condition"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope appearance-none cursor-pointer"
                            value={book.condition}
                            onChange={handleChange}
                        >
                            {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">التصنيف</label>
                        <select
                            name="category"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope appearance-none cursor-pointer"
                            value={book.category}
                            onChange={handleChange}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">غلاف الكتاب</label>
                    <div className="flex items-center gap-6 p-6 bg-surface-container-highest rounded-xl border-2 border-dashed border-outline-variant/30">
                        <div className="flex-1">
                            <input
                                type="file"
                                name="coverPhoto"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="block w-full text-sm text-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-on-primary hover:file:opacity-90 cursor-pointer"
                                required
                            />
                        </div>
                        {book.coverPhoto && book.coverPhoto instanceof File && (
                            <img
                                src={URL.createObjectURL(book.coverPhoto)}
                                alt="preview"
                                className="w-16 h-24 rounded object-cover shadow-lg"
                            />
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-5 rounded-xl font-bold hover:opacity-90 transition-opacity mt-4 shadow-xl shadow-primary/10"
                >
                    عرض الكتاب للبيع
                </button>
            </form>
        </div>
    </div>
  );
};

export default AddBook;
