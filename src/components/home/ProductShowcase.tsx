"use client";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { addToCart } from "@/redux/features/cart/cartSlice"; // Import your cart action
import { useAppDispatch } from "@/redux/hooks"; // Assuming you have typed hooks
import { toast } from "sonner"; // Import Sonner

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define TypeScript interfaces based on your database structure
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

interface Category {
  id: string;
  categoryName: string;
  isDeleted?: boolean; // Add optional isDeleted property
  createdAt: string;
  updatedAt: string;
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: Product[];
}

interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}

// Create a union type for category options
type CategoryOption = {
  id: string;
  categoryName: string;
};

const ProductShowcase = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("All");
  const dispatch = useAppDispatch();

  const { data: productsResponse, isLoading: productsLoading } =
    useGetAllProductsQuery() as {
      data: ProductResponse;
      isLoading: boolean;
    };

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery() as {
      data: CategoryResponse;
      isLoading: boolean;
    };

  // Get products and categories from API responses
  const allProducts = productsResponse?.data || [];
  const allCategories = categoriesResponse?.data || [];

  // Filter products based on selected category
  const filteredProducts =
    activeCategoryId === "All"
      ? allProducts.filter((product) => !product.isDeleted)
      : allProducts.filter(
          (product: Product) =>
            product.categoryId === activeCategoryId && !product.isDeleted
        );

  // Create category options with "All" option - Fix TypeScript issue
  const categoryOptions: CategoryOption[] = [
    { id: "All", categoryName: "All" },
    ...allCategories
      .filter((category) => !category.isDeleted)
      .map((category) => ({
        id: category.id,
        categoryName: category.categoryName,
      })),
  ];

  // Handle add to cart functionality
  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.productName,
      price: product.price,
      quantity: 1,
      stock: product.stock,
      imageUrl: product.images[0] || undefined,
    };

    dispatch(addToCart(cartItem));

    // Show success toast
    toast.success(`${product.productName} added to cart!`, {
      description: `$${product.price} • 1 item`,
      duration: 3000,
    });
  };

  if (productsLoading || categoriesLoading) {
    return (
      <section className="py-16 bg-grey20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto"></div>
            <p className="mt-4 text-grey100">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-grey20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h6 className="text-green font-heading text-lg font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block">
            Our Products
          </h6>
          <h2 className="text-black font-heading text-5xl font-medium">
            Our Fresh Products
          </h2>
          <p className="text-grey100 text-sm font-body max-w-full md:max-w-lg lg:max-w-md mx-auto">
            We pride ourselves on offering a wide variety of fresh and flavorful
            fruits, vegetables, and salad ingredients.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 lg:gap-3 mb-12 flex-wrap">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`px-6 py-3 rounded-lg border text-lg font-heading font-normal transition-all duration-200 ${
                activeCategoryId === category.id
                  ? "bg-green text-white border-green"
                  : "bg-grey80 text-[#A6A6A6] border-grey80  hover:bg-green hover:text-white"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl pt-[10px] px-3 pb-5 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Product image container - clickable */}
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 bg-grey20 p-3 flex items-center justify-center overflow-hidden cursor-pointer rounded-2xl">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.productName}
                      width={200}
                      height={200}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-product.jpg";
                      }}
                    />
                  ) : (
                    <div className="text-6xl text-grey100">📦</div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>

              {/* Product info */}
              <div className="text-center">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-black font-heading text-lg font-medium hover:text-green transition-colors duration-200 cursor-pointer">
                    {product.productName}
                  </h3>
                </Link>
                <p className="text-grey100 text-lg mt-2">${product.price}</p>
                <div className="flex flex-col gap-2 mt-3">
                  <button
                    className={`w-full py-3 rounded-lg font-heading text-lg font-normal transition-colors duration-200 ${
                      product.stock === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-black border border-grey80 hover:bg-primary hover:text-white hover:border-primary"
                    }`}
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-grey100 text-lg">
              No products found in this category.
            </p>
          </div>
        )}

        {/* See All Products button */}
        <div className="text-center">
          <Link href="/products">
            <button className="bg-white hover:bg-primary text-primary hover:text-white border-2 border-primary px-8 py-4 rounded-lg font-heading text-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              See All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
