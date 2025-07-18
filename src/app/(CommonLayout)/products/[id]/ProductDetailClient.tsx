// src/app/products/[id]/ProductDetailClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";

// Redux imports
import { useGetProductByIdQuery } from "@/redux/features/products/productApi";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toggleFavorite } from "@/redux/features/favorites/favoritesSlice";
import { RootState } from "@/redux/store";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Types
interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductDetailClientProps {
  initialProduct: Product;
  productId: string;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  initialProduct,
  productId,
}) => {
  const dispatch = useDispatch();

  // Redux state
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // RTK Query for real-time data updates (optional)
  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId, {
    // Use initial data from server, but allow background refetch
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
  });

  // Use server data initially, fallback to RTK Query data
  const product = productData?.data || initialProduct;

  // Local state
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Arman Khan",
      rating: 5,
      comment: "Amazing quality! Fresh and delicious. Highly recommended!",
      date: "2024-12-01",
    },
    {
      id: "2",
      userName: "Sarah Johnson",
      rating: 4,
      comment: "Good product, quick delivery. Will order again.",
      date: "2024-11-28",
    },
  ]);

  // Check if product is favorite
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  // Handlers
  const increaseQuantity = () =>
    setQuantity((qty) => Math.min(qty + 1, product.stock));
  const decreaseQuantity = () => setQuantity((qty) => Math.max(qty - 1, 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.productName,
        price: product.price,
        quantity: quantity,
        imageUrl: product.images[0],
        stock: product.stock,
      })
    );

    // Show success message (you can implement toast notification)
    alert(`${quantity} ${product.productName}(s) added to cart!`);
  };

  const handleToggleFavorite = () => {
    dispatch(
      toggleFavorite({
        id: product.id,
        name: product.productName,
        price: product.price,
        image: product.images[0],
      })
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement review submission logic
    console.log("Review submitted");
  };

  // Loading state
  if (isLoading && !initialProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !initialProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Product
          </h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="text-green hover:text-green/80 font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link
                href="/products"
                className="text-green hover:text-green/80 font-medium"
              >
                Products
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500 font-medium">
                {product.productName}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div>
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mb-4 rounded-xl overflow-hidden h-96"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={product.productName}
                    fill
                    className="object-cover rounded-xl"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {product.images.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Thumbs]}
              className="h-24"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${product.productName} thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-heading font-medium text-black mb-2">
            {product.productName}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-5 h-5" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              5.0 ({reviews.length} reviews)
            </span>
          </div>

          <div className="text-3xl font-heading font-medium text-green mb-6">
            ${product.price}/kg
          </div>

          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 0
                  ? "bg-green/10 text-green"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            {product.description.split("\n")[0]}
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-black mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-l-lg flex items-center justify-center transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="bg-gray-100 w-16 h-10 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-r-lg flex items-center justify-center transition-colors"
                disabled={quantity >= product.stock}
              >
                +
              </button>
              <span className="ml-3 text-gray-600">kg</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 hover:bg-gray-200 text-black"
              }`}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-green hover:bg-green/90 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
            >
              <FaShoppingCart />
              {product.stock === 0 ? "Out of Stock" : "Add to cart"}
            </button>
          </div>

          {/* Description/Reviews Tabs */}
          <div>
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-3 px-1 border-b-2 font-medium text-lg ${
                    activeTab === "description"
                      ? "border-green text-green"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-3 px-1 border-b-2 font-medium text-lg ${
                    activeTab === "reviews"
                      ? "border-green text-green"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </nav>
            </div>

            <div>
              {activeTab === "description" ? (
                <div className="prose max-w-none">
                  {product.description.split("\n").map(
                    (paragraph, index) =>
                      paragraph.trim() && (
                        <p
                          key={index}
                          className="text-gray-700 mb-4 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      )
                  )}
                </div>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 py-6"
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium text-lg">
                          {review.userName}
                        </h4>
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}

                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Add a review</h3>
                    <form onSubmit={handleSubmitReview}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green focus:border-green"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Rating
                          </label>
                          <select
                            id="rating"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green focus:border-green"
                          >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="review"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="review"
                          rows={4}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green focus:border-green"
                          placeholder="Share your thoughts about this product..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
