import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" dir="rtl">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>كتابي تاني</h3>
                    <p>منصة لتبادل الكتب المستعملة وجعل المعرفة متاحة للجميع.</p>
                </div>
                <div className="footer-section">
                    <h3>روابط سريعة</h3>
                    <ul>
                        <li><a href="/home">الرئيسية</a></li>
                        <li><a href="/login">تسجيل الدخول</a></li>
                        <li><a href="/register">إنشاء حساب</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>تواصل معنا</h3>
                    <p>البريد الإلكتروني: info@kitabitany.com</p>
                    <p>الهاتف: +20 123 456 789</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} كتابي تاني - جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;
