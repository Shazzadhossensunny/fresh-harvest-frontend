"use client";

import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

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
  name: string;
  description?: string;
  isDeleted: boolean;
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

const ProductShowcase = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("All");

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

  // Create category options with "All" option
  const categoryOptions = [
    { id: "All", name: "All" },
    ...allCategories.filter((category) => !category.isDeleted),
  ];

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
        <div className="text-center mb-12">
          <h2 className="text-green font-heading text-2xl font-medium mb-2">
            Our Products
          </h2>
          <h1 className="text-black font-heading text-5xl font-medium mb-4">
            Our Fresh Products
          </h1>
          <p className="text-grey100 text-lg max-w-2xl mx-auto">
            We pride ourselves on offering a wide variety of fresh and flavorful
            fruits, vegetables, and salad ingredients.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                activeCategoryId === category.id
                  ? "bg-green text-white"
                  : "bg-grey80 text-grey100 hover:bg-green hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Product image container - clickable */}
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 bg-grey80 flex items-center justify-center overflow-hidden cursor-pointer">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.productName}
                      fill
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
              <div className="p-6 text-center">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-black font-heading text-xl font-medium mb-2 hover:text-green transition-colors duration-200 cursor-pointer">
                    {product.productName}
                  </h3>
                </Link>
                <p className="text-grey100 text-lg mb-2">${product.price}</p>
                <p className="text-grey100 text-sm mb-4">
                  Stock: {product.stock}
                </p>
                <div className="flex flex-col gap-2">
                  <Link href={`/products/${product.id}`}>
                    <button className="w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                      View Details
                    </button>
                  </Link>
                  <button
                    className="w-full py-3 rounded-lg text-base font-medium transition-colors duration-200 bg-white text-black border border-grey80 hover:bg-primary hover:text-white hover:border-primary"
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart logic here
                      console.log(`Added ${product.productName} to cart`);
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
            <button className="bg-white hover:bg-primary text-black hover:text-white border-2 border-primary px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              See All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
