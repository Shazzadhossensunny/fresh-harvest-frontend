"use client";
// app/products/[productId]/page.tsx
import React from "react";
import Image from "next/image";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Mock data - replace with your actual data fetching
const product = {
  id: "67514a611cdb919fe028cf09",
  productName: "Coconut",
  description:
    "From our farm directly to your door, our fresh coconuts are harvested at the peak of ripeness, offering you a sweet, hydrating treat full of flavor. Packed with natural nutrients, coconut is perfect for a variety of culinary uses, from smoothies to savory dishes, or even for a refreshing drink straight from the shell.\n\nOur coconuts are sustainably grown, ensuring the best quality and taste. Each coconut is handpicked and carefully prepared, offering you the freshest product possible. Rich in healthy fats, electrolytes, and essential nutrients, coconuts provide both hydration and nourishment. Whether you're using the water, flesh, or milk, our coconuts bring versatility to your kitchen while supporting healthy living.\n\nPerfect for smoothies, desserts, curries, and more — let the natural sweetness of the coconut elevate your recipes. Enjoy the tropical goodness in its purest form, directly from nature.",
  price: 6.3,
  stock: 50,
  images: [
    "https://i.ibb.co.com/cyCs2B7/coconut1.jpg",
    "https://i.ibb.co.com/cyCs2B7/coconut2.jpg",
    "https://i.ibb.co.com/cyCs2B7/coconut3.jpg",
    "https://i.ibb.co.com/cyCs2B7/coconut4.jpg",
  ],
  categoryId: "6751516f9c52879c1fde6558",
  isDeleted: false,
  rating: 5.0,
  reviews: [
    {
      id: "1",
      userName: "Arman Khan",
      rating: 5,
      comment:
        "The coconuts were incredibly fresh and sweet. Perfect for my morning smoothies!",
      date: "2024-05-15",
    },
    {
      id: "2",
      userName: "Sarah Johnson",
      rating: 4,
      comment:
        "Good quality, but a bit difficult to open. Would buy again though!",
      date: "2024-05-10",
    },
  ],
};

const relatedProducts = [
  {
    id: "1",
    name: "Kiwi",
    price: 5.3,
    image: "https://i.ibb.co.com/cyCs2B7/kiwi.jpg",
  },
  {
    id: "2",
    name: "Orange",
    price: 4.2,
    image: "https://i.ibb.co.com/cyCs2B7/orange.jpg",
  },
  {
    id: "3",
    name: "Guava",
    price: 2.2,
    image: "https://i.ibb.co.com/cyCs2B7/guava.jpg",
  },
  {
    id: "4",
    name: "Eggplant",
    price: 1.2,
    image: "https://i.ibb.co.com/cyCs2B7/eggplant.jpg",
  },
];

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = React.useState("description");
  const [quantity, setQuantity] = React.useState(1);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  const increaseQuantity = () => setQuantity((qty) => Math.min(qty + 1, 10));
  const decreaseQuantity = () => setQuantity((qty) => Math.max(qty - 1, 1));

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
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

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
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
            <span className="ml-2 text-gray-600">5.0 (1 review)</span>
          </div>

          <div className="text-3xl font-heading font-medium text-green mb-6">
            ${product.price}/kg
          </div>

          <p className="text-gray-700 mb-8">
            {product.description.split("\n")[0]}
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-black mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-l-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
              <div className="bg-gray-100 w-16 h-10 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-r-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
              <span className="ml-3 text-gray-600">kg</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-black"
              }`}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              Save as favorite
            </button>

            <button className="flex items-center gap-2 bg-green hover:bg-green/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              <FaShoppingCart />
              Add to cart
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
                  Reviews ({product.reviews.length})
                </button>
              </nav>
            </div>

            <div>
              {activeTab === "description" ? (
                <div className="prose max-w-none">
                  {product.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div>
                  {product.reviews.map((review) => (
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
                    <form>
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green focus:border-green"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg font-medium"
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

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="text-3xl font-heading font-medium text-black mb-2 text-center">
          Related products
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          You might also like these products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-heading font-medium text-black mb-1">
                  {product.name}
                </h3>
                <p className="text-green text-lg font-medium mb-4">
                  ${product.price}/kg
                </p>
                <button className="w-full bg-green hover:bg-green/90 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <FaShoppingCart />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
