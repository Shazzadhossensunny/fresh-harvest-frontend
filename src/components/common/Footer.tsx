import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-grey20 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}

        {/* Quick Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8">
          {/* Logo and App Download Section */}
          <div className="flex flex-col justify-between">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  width={20}
                  height={20}
                  alt="logo-img"
                />
                <span className="font-heading text-xl lg:text-2xl font-medium text-black">
                  Fresh Harvest
                </span>
              </Link>
            </div>

            {/* App Download Section */}
            <div>
              <p className="text-grey100 font-body text-sm mb-4">
                Download App:
              </p>
              <div className="flex gap-4">
                <Image
                  src="/images/app.png"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
                <Image
                  src="/images/play.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
          {/* Quick links 1 */}
          <div>
            <h3 className="text-lg font-heading font-medium text-black mb-4">
              Quick links 1
            </h3>
            <ul className="space-y-3">
              {["Home", "Shop", "About us", "Blog", "Detail Blog"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-grey100 hover:text-primary transition-colors text-sm"
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
            <h3 className="text-lg font-heading font-medium text-black mb-4">
              Quick links 2
            </h3>
            <ul className="space-y-3">
              {["Favorites", "Cart", "Sign In", "Register"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-grey100 hover:text-primary transition-colors text-sm"
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
            <div>
              <h3 className="text-lg font-medium text-black mb-4 font-heading">
                Contact us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-grey100 text-sm">
                  <Phone className="w-4 h-4 text-[#749B3F]" />
                  1234 5678 90
                </li>
                <li className="flex items-center gap-2 text-grey100 text-sm">
                  <Mail className="w-4 h-4 text-[#749B3F]" />
                  <Link
                    href="mailto:freshharvests@gmail.com"
                    className="text-grey100 text-sm"
                  >
                    Freshharvests@gmail.com
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#749B3F] mt-0.5" />
                  <span className="text-grey100 text-sm">
                    Tanjung Sari Street, Pontianak, Indonesia
                  </span>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="mt-8">
              <h4 className="text-black font-heading text-sm font-medium pb-3">
                Accepted Payment Methods:
              </h4>
              <div className="flex gap-2">
                <div className="w-16 h-12 flex justify-center items-center p-1 rounded bg-white border-[0.83px] border-[#F3F3F3]">
                  <Image
                    src="/images/visa.png"
                    alt="Visa"
                    width={62}
                    height={44}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="w-16 h-12 flex justify-center items-center p-1 rounded bg-white border-[0.83px] border-[#F3F3F3]">
                  <Image
                    src="/images/paypal.png"
                    alt="Visa"
                    width={62}
                    height={44}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="w-16 h-12 flex justify-center items-center p-1 rounded bg-white border-[0.83px] border-[#F3F3F3]">
                  <Image
                    src="/images/pay.png"
                    alt="Visa"
                    width={62}
                    height={44}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#D9D9D9]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-black font-heading font-medium text-sm order-2 lg:order-1">
              © Copyright 2024. All Rights Reserved by Banana Studio
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 order-3">
              <span className="w-8 h-8 bg-black hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <Twitter className="w-4 h-4 text-white" />
              </span>
              <span className="w-8 h-8 bg-black hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors cursor pointer">
                <Facebook className="w-4 h-4 text-white" />
              </span>
              <span className="w-8 h-8 bg-black hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
