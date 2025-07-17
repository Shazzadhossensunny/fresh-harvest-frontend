"use client";

import React, { useState } from "react";
import { ShoppingCart, Leaf } from "lucide-react";

// Define TypeScript interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: "fruits" | "vegetables" | "salad";
}

type Category = "All" | "Fruits" | "Vegetables" | "Salad";

const ProductShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Fruits", "Vegetables", "Salad"];

  const products: Product[] = [
    { id: 1, name: "Mushroom", price: 2.3, unit: "kg", category: "vegetables" },
    { id: 2, name: "Mustard", price: 1.3, unit: "kg", category: "vegetables" },
    { id: 3, name: "Orange", price: 4.2, unit: "kg", category: "fruits" },
    { id: 4, name: "Pomegranate", price: 11.2, unit: "kg", category: "fruits" },
    { id: 5, name: "Kiwi", price: 5.3, unit: "kg", category: "fruits" },
    { id: 6, name: "Coconut", price: 6.3, unit: "kg", category: "fruits" },
    { id: 7, name: "Guava", price: 2.2, unit: "kg", category: "fruits" },
    { id: 8, name: "Eggplant", price: 1.2, unit: "kg", category: "vegetables" },
    { id: 9, name: "Lettuce", price: 1.8, unit: "kg", category: "salad" },
    { id: 10, name: "Tomato", price: 2.5, unit: "kg", category: "vegetables" },
    { id: 11, name: "Strawberry", price: 7.4, unit: "kg", category: "fruits" },
    { id: 12, name: "Spinach", price: 3.0, unit: "kg", category: "salad" },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category ===
            (activeCategory.toLowerCase() as Product["category"])
        );

  return (
    <section className="py-16 bg-grey20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-heading font-medium text-black mb-3">
            Our Products
          </h1>
          <h2 className="text-3xl font-heading font-medium text-green mb-5">
            Our Fresh Products
          </h2>
          <p className="text-lg text-grey100 max-w-2xl mx-auto">
            We pride ourselves on offering a wide variety of fresh and flavorful
            fruits, vegetables, and salad ingredients.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-green text-white"
                  : "bg-white text-black hover:bg-grey80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56 bg-gradient-to-br from-green/10 to-green/30 flex items-center justify-center">
                <div className="bg-white/80 w-32 h-32 rounded-full flex items-center justify-center">
                  <Leaf className="text-green w-14 h-14" />
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <Leaf className="text-green w-5 h-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading font-medium text-black mb-2">
                  {product.name}
                </h3>
                <p className="text-green text-xl font-medium mb-4">
                  ${product.price}/{product.unit}
                </p>
                <button className="w-full bg-green hover:bg-green/90 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
                  <ShoppingCart className="w-5 h-5" /> Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See All Products button */}
        <div className="text-center mt-14">
          <button className="bg-white hover:bg-grey80 text-black border-2 border-green px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center gap-2 transition-colors duration-200">
            See All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
