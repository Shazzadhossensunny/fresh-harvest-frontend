"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles (you'll need to add these to your project)
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
  category?: string;
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

// Related products data (you can replace with actual API call)
const relatedProducts = [
  {
    id: "1",
    name: "Kiwi",
    price: 5.3,
    image: "/images/kiwi.jpg",
  },
  {
    id: "2",
    name: "Orange",
    price: 4.2,
    image: "/images/orange.jpg",
  },
  {
    id: "3",
    name: "Guava",
    price: 2.2,
    image: "/images/guava.jpg",
  },
  {
    id: "4",
    name: "Eggplant",
    price: 1.2,
    image: "/images/eggplant.jpg",
  },
];

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  initialProduct,
  productId,
}) => {
  // Use server data initially
  const product = initialProduct;

  // Local state
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Arman Khan",
      rating: 5,
      comment:
        "Our coconuts are sustainably grown, ensuring the best quality and taste. Each coconut is handpicked and carefully prepared, offering you the freshest product possible. Rich in healthy fats, electrolytes, and essential nutrients, coconuts provide both hydration and nourishment. Whether you're using the water, flesh, or milk, our coconuts bring versatility to your kitchen while supporting healthy living.\n\nPerfect for smoothies, desserts, curries, and more — let the natural sweetness of the coconut elevate your recipes. Enjoy the tropical goodness in its purest form, directly from nature.",
      date: "2024-12-01",
    },
  ]);

  // Handlers
  const increaseQuantity = () =>
    setQuantity((qty) => Math.min(qty + 1, product.stock));
  const decreaseQuantity = () => setQuantity((qty) => Math.max(qty - 1, 1));

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`${quantity} ${product.productName}(s) added to cart!`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="relative">
              {/* Main product image */}
              <div className="aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden relative">
                <Image
                  src={product.images[0] || "/images/coconut.jpg"}
                  alt={product.productName}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Blue circle with number - positioned like in image */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  0
                </div>
              </div>

              {/* Thumbnail dots indicator */}
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((dot, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === 0 ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category Tag */}
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                {product.category || "Fruits"}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900">
              {product.productName}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">5.0 (1 review)</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-orange-500">
              ${product.price}/kg
            </div>

            {/* Yellow highlighted description box */}
            <div className="bg-yellow-100 border-2 border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">
                From our farm directly to your door, our fresh coconuts are
                harvested at the peak of ripeness, offering you a sweet,
                hydrating treat full of flavor. Packed with natural nutrients,
                coconut is perfect for a variety of culinary uses, from
                smoothies to savory dishes, or even for a refreshing drink
                straight from the shell.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-lg font-medium text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">/kg</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors flex-1 justify-center ${
                  isFavorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
                Save as favorite
              </button>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex-1 justify-center"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* Description/Reviews Tabs */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-3 px-1 font-medium text-lg transition-colors relative ${
                  activeTab === "description"
                    ? "text-white bg-green-600 px-6 rounded-lg"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-3 px-1 font-medium text-lg transition-colors ${
                  activeTab === "reviews"
                    ? "text-white bg-green-600 px-6 rounded-lg"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews (1)
              </button>
            </nav>
          </div>

          <div>
            {activeTab === "description" ? (
              <div className="space-y-6">
                {/* Author tag */}
                <div className="flex justify-end">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-medium">
                    Arman Khan
                  </span>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our coconuts are sustainably grown, ensuring the best
                    quality and taste. Each coconut is handpicked and carefully
                    prepared, offering you the freshest product possible. Rich
                    in healthy fats, electrolytes, and essential nutrients,
                    coconuts provide both hydration and nourishment. Whether
                    you're using the water, flesh, or milk, our coconuts bring
                    versatility to your kitchen while supporting healthy living.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Perfect for smoothies, desserts, curries, and more — let the
                    natural sweetness of the coconut elevate your recipes. Enjoy
                    the tropical goodness in its purest form, directly from
                    nature.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 py-6"
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-lg">{review.userName}</h4>
                      <span className="text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="text-center mb-12">
          <p className="text-green-600 font-medium mb-2">Our Products</p>
          <h2 className="text-3xl font-bold text-gray-900">Related products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {relatedProduct.name}
              </h3>
              <p className="text-gray-600 text-lg mb-4">
                ${relatedProduct.price}/kg
              </p>
              <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
