// components/common/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import LogoImg from "../../../public/images/logo.png";
import AuthModals from "../AuthModals";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register">("login");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = (type: "login" | "register") => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const switchAuthType = (type: "login" | "register") => {
    setAuthType(type);
  };

  const navItems = [
    { href: "/", label: "Home", active: true },
    { href: "/shop", label: "Shop", active: false },
    { href: "/about", label: "About us", active: false },
    { href: "/blog", label: "Blog", active: false },
  ];

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={LogoImg} width={20} height={20} alt="logo-img" />
            <span className="font-heading text-xl lg:text-2xl font-medium text-black">
              Fresh Harvest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    item.active
                      ? "text-black border-b-2 border-green"
                      : "text-grey100 hover:text-green"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-grey100 hover:text-green p-2 transition-colors duration-200">
              <Heart className="w-5 h-5" />
              <span className="text-sm ml-1">Favorites</span>

              <span className="ml-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                4
              </span>
            </button>

            <button className="flex items-center text-grey100 hover:text-green p-2 transition-colors duration-200 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm ml-1">Cart</span>

              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </button>

            <button
              onClick={() => openAuthModal("login")}
              className="bg-green text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green/90 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-grey100 hover:text-green transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-grey100 hover:text-green"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-12 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    item.active ? "text-black" : "text-grey100 hover:text-green"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              ))}

              <hr className="my-4" />

              <button className="flex items-center w-full text-grey100 hover:text-green px-3 py-2 text-sm font-medium transition-colors duration-200">
                <Heart className="w-4 h-4 mr-2" />
                Favorites 4
              </button>

              <button className="flex items-center w-full text-grey100 hover:text-green px-3 py-2 text-sm font-medium transition-colors duration-200">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart 0
              </button>

              <button
                onClick={() => {
                  openAuthModal("login");
                  toggleMobileMenu();
                }}
                className="w-full bg-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green/90 transition-colors duration-200 mt-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <AuthModals
        isOpen={isAuthModalOpen}
        authType={authType}
        onClose={closeAuthModal}
        onSwitchType={switchAuthType}
      />
    </header>
  );
};

export default Header;
