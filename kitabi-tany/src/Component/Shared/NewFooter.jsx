import React from "react";
import { Link } from "react-router-dom";

const NewFooter = () => {
  return (
    <footer className="bg-[#f4f4f0] dark:bg-[#1b1c1a] w-full py-12 mt-20 tonal-transition-top" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12 max-w-7xl mx-auto font-manrope text-xs uppercase tracking-widest text-right">
        <div className="space-y-6">
          <div className="font-notoSerif text-xl text-[#00333c] dark:text-[#ffffff] italic">
            كتابي تاني
          </div>
          <p className="text-[#777972] dark:text-[#91928d] normal-case leading-relaxed max-w-sm">
            © 2024 كتابي تاني. المنسق الرقمي لمحبي القراءة. بنرفع مستوى سوق الكتب المستعملة بدقة واهتمام.
          </p>
          <div className="flex space-x-6 space-x-reverse">
            <Link
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-[#004B57] text-[#777972]"
              to="#"
            >
              انستجرام
            </Link>
            <Link
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-[#004B57] text-[#777972]"
              to="#"
            >
              تويتر
            </Link>
            <Link
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-[#004B57] text-[#777972]"
              to="#"
            >
              لينكد إن
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-[#004B57]">الشركة</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="/about"
              >
                عن كتابي تاني
              </Link>
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="/curation"
              >
                عن اختياراتنا
              </Link>
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="/condition-guide"
              >
                دليل حالة الكتاب
              </Link>
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="/shipping"
              >
                الشحن
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-[#004B57]">قانوني ولغات</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="/privacy"
              >
                الخصوصية
              </Link>
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57] font-arabic normal-case text-lg"
                to="#"
              >
                العربية
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
