import React, { useState } from "react";
import "./AddBook.css";
import Cookies from 'js-cookie';

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    condition: "جديد",
    coverPhoto: "",
    category: "روايات",
  });

  const token = Cookies.get('token');

  if (!token) {
    alert("يرجى تسجيل الدخول أولاً");
    window.location.href = '/login'; // Redirect to login if no token is available
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    setBook({ ...book, coverPhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate price
    if (isNaN(book.price) || book.price <= 0) {
      alert("يرجى إدخال سعر صالح.");
      return;
    }

    // Check if cover photo is selected
    if (!book.coverPhoto) {
      alert("يرجى إضافة صورة الكتاب.");
      return;
    }

    const formData = new FormData();
    Object.keys(book).forEach((key) => formData.append(key, book[key]));

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("تمت إضافة الكتاب بنجاح!");
        setBook({
          title: "",
          author: "",
          description: "",
          price: "",
          condition: "جديد",
          coverPhoto: "",
          category: "روايات",
        });
      } else {
        const errorData = await response.json();
        alert(`فشل في إضافة الكتاب: ${errorData.message || "حدث خطأ غير متوقع"}`);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("حدث خطأ أثناء إضافة الكتاب. يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <div className="add-book-container" style={{ direction: "rtl" }}>
      <a href="/login">تسجيل الدخول</a>
      <h2>إضافة كتاب جديد</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">إضافة الكتاب</button>
      </form>
    </div>
  );
};

export default AddBook;
