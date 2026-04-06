import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { createBook } from '../services/bookService';
import "./AddBook.css";

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    condition: "جديد",
    coverPhoto: "",
    category: "روايات",
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      Swal.fire({
          icon: 'warning',
          title: 'تنبيه',
          text: 'يرجى تسجيل الدخول أولاً',
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
      navigate("/home");
    } catch (error) {
      Swal.fire('فشل', error.message || 'حدث خطأ أثناء إضافة الكتاب.', 'error');
    }
  };

  return (
    <div className="add-book-container" dir="rtl">
      <div className="page-header-actions">
            <Link to="/home" className="btn-back">العودة</Link>
            <Link to="/profile" className="btn-profile">الملف الشخصي</Link>
      </div>

      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-header">إضافة كتاب جديد</h2>
            <input
            type="text"
            name="title"
            placeholder="اسم الكتاب"
            value={book.title}
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="author"
            placeholder="اسم المؤلف"
            value={book.author}
            onChange={handleChange}
            required
            />
            <textarea
            name="description"
            placeholder="وصف الكتاب"
            value={book.description}
            onChange={handleChange}
            />
            <input
            type="number"
            name="price"
            placeholder="السعر"
            value={book.price}
            onChange={handleChange}
            required
            />
            <select name="condition" value={book.condition} onChange={handleChange}>
            <option value="جديد">جديد</option>
            <option value="مثل الجديد">مثل الجديد</option>
            <option value="جيد">جيد</option>
            <option value="مقبول">مقبول</option>
            </select>
            <input
            type="file"
            name="coverPhoto"
            onChange={handleFileChange}
            accept="image/*"
            required
            />
            <select name="category" value={book.category} onChange={handleChange}>
            <option value="روايات">روايات</option>
            <option value="علمية">علمية</option>
            <option value="تاريخية">تاريخية</option>
            <option value="سيرة ذاتية">سيرة ذاتية</option>
            <option value="رومانسية">رومانسية</option>
            <option value="غموض">غموض</option>
            <option value="خيال">خيال</option>
            <option value="أطفال">أطفال</option>
            <option value="غير روائية">غير روائية</option>
            <option value="مغامرات">مغامرات</option>
            <option value="علم النفس">علم النفس</option>
            </select>
            <button type="submit" className="auth-btn">إضافة الكتاب</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
