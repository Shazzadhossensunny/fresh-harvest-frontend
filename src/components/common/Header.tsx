// components/common/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import LogoImg from "../../../public/images/logo.png";
import AuthModals from "../AuthModals";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  useLoginMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get auth data from Redux store
  const { token, email } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!token;

  // Check if we're on client side and handle loading state
  useEffect(() => {
    // Small delay to check if auth state is loaded from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Get cart data from Redux store
  const { totalQuantity, totalAmount } = useAppSelector((state) => state.cart);

  // Get favorites data from Redux store
  const favorites = useAppSelector((state) => state.favorites.items);
  const favoritesCount = favorites.length;

  // Logout mutation
  const [logoutUser] = useLogoutUserMutation();

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

  const handleLogout = async () => {
    try {
      // Call the logout API
      await logoutUser({}).unwrap();
      setIsUserMenuOpen(false);
    } catch (error) {
      // Even if API fails, the Redux action in the mutation will handle logout
      console.error("Logout error:", error);
      // Fallback: dispatch logout manually if needed
      dispatch(logout());
      setIsUserMenuOpen(false);
    }
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
                  className={`relative px-3 py-2 text-sm transition-all duration-300 group ${
                    item.active ? "text-black" : "text-grey100 hover:text-green"
                  }`}
                >
                  {item.label}
                  {/* Active indicator - small centered border */}
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-green transition-all duration-300 ${
                      item.active ? "w-8" : "w-0 group-hover:w-6"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/favorite"
              className="flex items-center relative text-grey100 hover:text-green p-2 transition-colors duration-200 group"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-green" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-3 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </div>
              <span className="text-sm text-black ml-1">Favorites</span>

              {/* Favorites Preview on Hover */}
              <div
                className={`absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                  favoritesCount === 0 ? "pointer-events-none" : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-heading text-lg font-medium text-black">
                      Favorites
                    </h3>
                    <span className="text-sm text-grey100">
                      {favoritesCount} {favoritesCount === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {favoritesCount > 0 ? (
                    <>
                      <div className="max-h-64 overflow-y-auto mb-3">
                        {favorites.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black truncate">
                                {item.name}
                              </p>
                              <p className="text-sm text-green font-medium">
                                ${item.price}/kg
                              </p>
                            </div>
                          </div>
                        ))}
                        {favoritesCount > 3 && (
                          <p className="text-xs text-gray-500 text-center mt-2">
                            +{favoritesCount - 3} more items
                          </p>
                        )}
                      </div>

                      <Link
                        href="/favorites"
                        className="block w-full bg-green text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green/90 transition-colors duration-200 text-center"
                      >
                        View All Favorites
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No favorites yet
                    </p>
                  )}
                </div>
              </div>
            </Link>

            <Link
              href="/cart"
              className="flex items-center relative text-grey100 hover:text-green p-2 transition-colors duration-200 group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-green" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-3 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </span>
                )}
              </div>
              <span className="text-sm text-black ml-1">Cart</span>

              {/* Cart Preview on Hover */}
              <div
                className={`absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                  totalQuantity === 0 ? "pointer-events-none" : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-heading text-lg font-medium text-black">
                      Shopping Cart
                    </h3>
                    <span className="text-sm text-grey100">
                      {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {totalQuantity > 0 ? (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-black">Total:</span>
                        <span className="font-heading text-lg font-medium text-green">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        <Link
                          href="/cart"
                          className="block w-full bg-green text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green/90 transition-colors duration-200 text-center"
                        >
                          View Cart
                        </Link>
                        <Link
                          href="/checkout"
                          className="block w-full bg-white text-green border border-green py-2 px-4 rounded-md text-sm font-medium hover:bg-green hover:text-white transition-colors duration-200 text-center"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Your cart is empty
                    </p>
                  )}
                </div>
              </div>
            </Link>

            {/* Authentication Section */}
            {isLoading ? (
              // Loading skeleton
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-grey100 hover:text-green p-2 transition-colors duration-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green" />
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {email || "User"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Account settings
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="border border-black text-black px-6 py-3 rounded font-heading text-sm font-semibold hover:bg-green hover:text-white hover:border-green transition-colors duration-200"
              >
                Sign In
              </button>
            )}
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

              <Link
                href="/favorites"
                className="flex items-center justify-between w-full text-grey100 hover:text-green px-3 py-2 text-sm font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Favorites
                </div>
                {favoritesCount > 0 && (
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="flex items-center justify-between w-full text-grey100 hover:text-green px-3 py-2 text-sm font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </div>
                <div className="flex items-center space-x-2">
                  {totalQuantity > 0 && (
                    <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalQuantity > 99 ? "99+" : totalQuantity}
                    </span>
                  )}
                  {totalAmount > 0 && (
                    <span className="text-xs text-green font-medium">
                      ${totalAmount.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>

              <hr className="my-4" />

              {/* Mobile Authentication Section */}
              {isLoading ? (
                <div className="px-3 py-4">
                  <div className="animate-pulse flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {email || "User"}
                        </p>
                        <p className="text-xs text-gray-500">Signed in</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal("login");
                    toggleMobileMenu();
                  }}
                  className="w-full border border-black text-black px-6 py-3 rounded font-heading text-sm font-semibold hover:bg-green hover:text-white hover:border-green transition-colors duration-200 mt-4"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}

      {/* Auth Modals */}
      <AuthModals
        isOpen={isAuthModalOpen}
        authType={authType}
        onClose={closeAuthModal}
        onSwitchType={switchAuthType}
        useLoginMutation={useLoginMutation}
        useRegisterUserMutation={useRegisterUserMutation}
      />
    </header>
  );
};

export default Header;
