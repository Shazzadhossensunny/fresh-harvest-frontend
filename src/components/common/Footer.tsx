// components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 pb-12 border-b border-gray-700">
          {/* App Download Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-heading font-medium mb-6">
              Fresh Harvests
            </h1>
            <h2 className="text-xl text-gray-300 mb-4">Download App:</h2>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                  Openup Future
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                  All Tech
                </button>
              </div>
              <div className="flex gap-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                  AppStore
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                  Google Play
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
            {/* Quick links 1 */}
            <div>
              <h3 className="text-xl font-medium mb-4">Quick links 1</h3>
              <ul className="space-y-3">
                {["Home", "Shop", "About us", "Blog", "Detail Blog"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Quick links 2 */}
            <div>
              <h3 className="text-xl font-medium mb-4">Quick links 2</h3>
              <ul className="space-y-3">
                {["Favorites", "Conf", "Sign In", "Register"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact us */}
            <div>
              <h3 className="text-xl font-medium mb-4">Contact us</h3>
              <ul className="space-y-3 text-gray-400">
                <li>1234 5678 90</li>
                <li>
                  <Link
                    href="mailto:freshharvests@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    Freshharvests@gmail.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://portyung.sari-street.com"
                    className="hover:text-white transition-colors"
                  >
                    Portyung Sari Street, Pontianok, Indonesia
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Accepted Payment Methods:</span>
            <div className="flex gap-2">
              <div className="bg-gray-800 px-3 py-1 rounded-md">VISA</div>
              <div className="bg-gray-800 px-3 py-1 rounded-md">PayPal</div>
              <div className="bg-gray-800 px-3 py-1 rounded-md">Pay</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-center md:text-right">
            © Copyright 2024. All Rights Reserved by Bansna Studio
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
