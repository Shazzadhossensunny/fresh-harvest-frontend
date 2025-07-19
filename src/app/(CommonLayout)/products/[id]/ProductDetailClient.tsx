"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles (you'll need to add these to your project)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/features/products/productApi";
import { useGetCategoryByIdQuery } from "@/redux/features/category/categoryApi";
import { toast } from "sonner";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toggleFavorite } from "@/redux/features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Import your RTK Query hooks

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

interface Category {
  id: string;
  categoryName: string;
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

const ProductDetailClient = ({
  initialProduct,
  productId,
}: ProductDetailClientProps) => {
  // Use server data initially, but also fetch fresh data for interactivity
  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId);
  const product = productData?.data || initialProduct;

  // Fetch category data
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryByIdQuery(product.categoryId, { skip: !product.categoryId });

  // Fetch all products to get related products
  const { data: allProductsData, isLoading: allProductsLoading } =
    useGetAllProductsQuery(undefined);
  const dispatch = useAppDispatch();

  // Get favorites from Redux store
  const favorites = useAppSelector((state) => state.favorites.items);

  // Check if current product is in favorites
  const isProductFavorite = favorites.some((item) => item.id === product.id);

  // Filter related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!allProductsData?.data || !product) return [];

    return allProductsData.data
      .filter(
        (p: Product) =>
          p.categoryId === product.categoryId &&
          p.id !== product.id &&
          !p.isDeleted
      )
      .slice(0, 4); // Limit to 4 related products
  }, [allProductsData?.data, product]);

  // Local state
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Arman Khan",
      rating: 5,
      comment: `Our ${product.productName.toLowerCase()}s are sustainably grown, ensuring the best quality and taste. Each ${product.productName.toLowerCase()} is handpicked and carefully prepared, offering you the freshest product possible. Rich in essential nutrients, our ${product.productName.toLowerCase()}s provide both great taste and nourishment. Whether you're using them fresh or in recipes, our ${product.productName.toLowerCase()}s bring versatility to your kitchen while supporting healthy living.\n\nPerfect for smoothies, desserts, snacks, and more — let the natural goodness of ${product.productName.toLowerCase()} elevate your recipes. Enjoy the fresh taste in its purest form, directly from nature.`,
      date: "2024-12-01",
    },
  ]);

  // Handlers
  const increaseQuantity = () =>
    setQuantity((qty) => Math.min(qty + 1, product.stock));
  const decreaseQuantity = () => setQuantity((qty) => Math.max(qty - 1, 1));

  // Handle add to cart functionality for main product (with custom quantity)
  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.productName,
      price: product.price,
      quantity: quantity, // Use the selected quantity
      stock: product.stock,
      imageUrl: product.images[0] || undefined,
    };

    dispatch(addToCart(cartItem));

    // Show success toast
    toast.success(`${product.productName} added to cart!`, {
      description: `$${product.price} • ${quantity} item${
        quantity > 1 ? "s" : ""
      }`,
      duration: 3000,
    });
  };

  // Handle add to cart functionality for related products with favorite check
  const handleAddToCartRelated = (relatedProduct: Product) => {
    if (relatedProduct.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    const cartItem = {
      id: relatedProduct.id,
      name: relatedProduct.productName,
      price: relatedProduct.price,
      quantity: 1, // Default quantity for related products
      stock: relatedProduct.stock,
      imageUrl: relatedProduct.images[0] || undefined,
    };

    dispatch(addToCart(cartItem));

    // Show success toast
    toast.success(`${relatedProduct.productName} added to cart!`, {
      description: `${relatedProduct.price} • 1 item`,
      duration: 3000,
    });
  };

  // Handle toggle favorite for related products
  const handleToggleFavoriteRelated = (relatedProduct: Product) => {
    const favoriteItem = {
      id: relatedProduct.id,
      name: relatedProduct.productName,
      price: relatedProduct.price,
      image: relatedProduct.images[0] || "/images/default-product.jpg",
    };

    const isRelatedFavorite = favorites.some(
      (item) => item.id === relatedProduct.id
    );

    dispatch(toggleFavorite(favoriteItem));

    // Show appropriate toast message
    if (isRelatedFavorite) {
      toast.success(`${relatedProduct.productName} removed from favorites!`, {
        description: "Item removed from your favorites list",
        duration: 3000,
      });
    } else {
      toast.success(`${relatedProduct.productName} added to favorites!`, {
        description: "Item saved to your favorites list",
        duration: 3000,
      });
    }
  };

  // Handle toggle favorite functionality
  const handleToggleFavorite = () => {
    const favoriteItem = {
      id: product.id,
      name: product.productName,
      price: product.price,
      image: product.images[0] || "/images/default-product.jpg",
    };

    dispatch(toggleFavorite(favoriteItem));

    // Show appropriate toast message
    if (isProductFavorite) {
      toast.success(`${product.productName} removed from favorites!`, {
        description: "Item removed from your favorites list",
        duration: 3000,
      });
    } else {
      toast.success(`${product.productName} added to favorites!`, {
        description: "Item saved to your favorites list",
        duration: 3000,
      });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted");
  };

  // Image navigation handlers
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div className=" border border-[#0000001A] rounded-xl p-8 shadow-sm">
            <div className="relative">
              {/* Main product image */}
              <div className="aspect-square mb-4 rounded-xl overflow-hidden relative group">
                <Image
                  src={
                    product.images[currentImageIndex] ||
                    "/images/default-product.jpg"
                  }
                  alt={`${product.productName} - Image ${
                    currentImageIndex + 1
                  }`}
                  fill
                  className="object-cover transition-transform duration-300"
                  priority
                />

                {/* Navigation arrows - only show if more than 1 image */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Navigation bullets - only show if more than 1 image */}
              {product.images.length > 1 && (
                <div className="flex justify-center gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex
                          ? "bg-green-600"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Single image - just show one dot if only one image */}
              {product.images.length === 1 && (
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Category Tag */}
            <div>
              <h6 className="text-green font-heading text-lg font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block capitalize">
                {categoryLoading
                  ? "Loading..."
                  : categoryData?.data?.categoryName || "Product"}
              </h6>
            </div>

            {/* Product Name */}
            <h2 className="text-black font-heading text-5xl font-medium">
              {product.productName}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <h6 className="text-black font-heading text-lg font-medium">
                5.0 <span className="text-xs">(1 review)</span>
              </h6>
            </div>

            {/* Price */}
            <div className="text-3xl font-heading font-semibold text-primary">
              ${product.price}/kg
            </div>

            <p className="text-grey100 text-lg leading-relaxed pb-20">
              {product.description}
            </p>

            {/* Stock Info */}
            <div className="text-sm text-gray-600 mb-4">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600">✗ Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3 flex items-center gap-2 pb-10">
              <label className="text-lg font-heading font-medium text-black">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D9D9D9] rounded">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 text-black border-r border-l border-[#D9D9D9]  font-heading font-medium text-lg min-w-[60px] text-center">
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
                className={`flex items-center gap-2.5 font-heading text-lg px-8 py-4 rounded-lg font-semibold transition-colors flex-1 justify-center ${
                  isProductFavorite
                    ? "bg-primary text-white hover:bg-orange-600"
                    : "bg-grey20 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isProductFavorite
                      ? "fill-current text-white"
                      : "text-[#D9D9D9]"
                  }`}
                />
                {isProductFavorite
                  ? "Remove from favorites"
                  : "Save as favorite"}
              </button>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2.5 bg-primary hover:bg-orange-600 font-heading text-lg px-8 py-4 text-white rounded-lg font-semibold transition-colors flex-1 justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? "Out of Stock" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Description/Reviews Tabs */}
        <div className="p-8 mb-16">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-3 px-6 rounded-xl border font-heading font-medium text-lg transition-colors relative ${
                activeTab === "description"
                  ? "text-white bg-green border-green"
                  : "text-[#A6A6A6] border-grey80 "
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 px-6 rounded-xl border font-heading font-medium text-lg transition-colors relative ${
                activeTab === "reviews"
                  ? "text-white bg-green border-green"
                  : "text-[#A6A6A6] border-grey80 "
              }`}
            >
              Reviews (1)
            </button>
          </nav>

          <div className="bg-grey20 px-10 py-8 rounded-3xl mt-6 max-w-full lg:max-w-4xl">
            {activeTab === "description" ? (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-grey100 text-lg font-body leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-grey100 text-lg font-body leading-relaxed">
                    Our {product.productName.toLowerCase()}s are carefully
                    selected and stored under optimal conditions to ensure
                    maximum freshness and nutritional value. Perfect for daily
                    consumption and various culinary applications.
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
                    <p className="text-gray-700 whitespace-pre-line">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <>
            <div className="text-center mb-12 space-y-4">
              <h6 className="text-green font-heading text-lg font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block">
                Our Products
              </h6>
              <h2 className="text-black font-heading text-5xl font-medium">
                Related products
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-48">
              {allProductsLoading
                ? // Loading skeleton for related products
                  [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-sm animate-pulse"
                    >
                      <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ))
                : relatedProducts.map((relatedProduct: Product) => (
                    <div
                      key={relatedProduct.id}
                      className="bg-white rounded-2xl pt-[10px] px-3 pb-5 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                      <Link href={`/products/${relatedProduct.id}`}>
                        <div className="relative h-48 bg-grey20 p-3 flex items-center justify-center overflow-hidden cursor-pointer rounded-2xl">
                          <Image
                            src={
                              relatedProduct.images[0] ||
                              "/images/default-product.jpg"
                            }
                            alt={relatedProduct.productName}
                            width={200}
                            height={200}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder-images.svg";
                            }}
                          />
                        </div>
                      </Link>
                      <div className="text-center">
                        <Link href={`/products/${relatedProduct.id}`}>
                          <h3 className="text-black font-heading text-lg font-medium hover:text-green transition-colors duration-200 cursor-pointer">
                            {relatedProduct.productName}
                          </h3>
                        </Link>
                        <p className="text-grey100 text-lg mt-2">
                          ${relatedProduct.price}/kg
                        </p>
                        <div className="flex flex-col gap-2 mt-3">
                          <button
                            onClick={() =>
                              handleAddToCartRelated(relatedProduct)
                            }
                            className={`w-full py-3 rounded-lg font-heading text-lg font-normal transition-colors duration-200 ${
                              relatedProduct.stock === 0
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-black border border-grey80 hover:bg-primary hover:text-white hover:border-primary"
                            }`}
                            disabled={relatedProduct.stock === 0}
                          >
                            {relatedProduct.stock === 0
                              ? "Out of Stock"
                              : "Add to cart"}
                          </button>
                          <button
                            onClick={() =>
                              handleToggleFavoriteRelated(relatedProduct)
                            }
                            className={`w-full py-2 rounded-lg font-heading text-sm font-normal transition-colors duration-200 flex items-center justify-center gap-2 ${
                              favorites.some(
                                (item) => item.id === relatedProduct.id
                              )
                                ? "bg-primary text-white hover:bg-orange-600"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                favorites.some(
                                  (item) => item.id === relatedProduct.id
                                )
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                            {favorites.some(
                              (item) => item.id === relatedProduct.id
                            )
                              ? "Remove from favorites"
                              : "Add to favorites"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailClient;
