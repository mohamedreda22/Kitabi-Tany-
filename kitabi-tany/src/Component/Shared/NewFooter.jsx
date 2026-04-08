import React from "react";
import { Link } from "react-router-dom";

const NewFooter = () => {
  return (
    <footer className="bg-[#f4f4f0] dark:bg-[#1b1c1a] w-full py-12 mt-20 tonal-transition-top">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12 max-w-7xl mx-auto font-manrope text-xs uppercase tracking-widest">
        <div className="space-y-6">
          <div className="font-notoSerif text-xl text-[#00333c] dark:text-[#ffffff] lowercase italic">
            kitabi tany
          </div>
          <p className="text-[#777972] dark:text-[#91928d] normal-case leading-relaxed max-w-sm">
            © 2024 Kitabi Tany. The Digital Curator for Bibliophiles. Elevating
            the second-hand book market with editorial precision.
          </p>
          <div className="flex space-x-6">
            <Link
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-[#004B57] text-[#777972]"
              to="#"
            >
              Instagram
            </Link>
            <Link
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-[#004B57] text-[#777972]"
              to="#"
            >
              Twitter
            </Link>
            <Link
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline decoration-[#004B57] text-[#777972]"
              to="#"
            >
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-[#004B57]">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="#"
              >
                About Our Curation
              </Link>
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="#"
              >
                Condition Guide
              </Link>
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="#"
              >
                Shipping
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-[#004B57]">Legal & Lang</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                className="text-[#777972] dark:text-[#91928d] hover:underline decoration-[#004B57]"
                to="#"
              >
                Privacy
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
