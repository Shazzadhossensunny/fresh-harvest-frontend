"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green via-green to-green/90 min-h-[600px] lg:min-h-[700px]">
      {/* Background Pattern - Fixed SVG data URL */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Leaves - Fixed with proper leaf icons */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white/30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22C6.66,19.09 8.14,15.83 12,15C9.33,13.33 10,7 10,7C17,7 20,13 18,16C16,19 13,19 12,19C16,19 19,16 20,14C21,12 21,11 17,8Z" />
          </svg>
        </div>
      </div>

      <div
        className="absolute top-32 right-20 animate-bounce"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white/30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22C6.66,19.09 8.14,15.83 12,15C9.33,13.33 10,7 10,7C17,7 20,13 18,16C16,19 13,19 12,19C16,19 19,16 20,14C21,12 21,11 17,8Z" />
          </svg>
        </div>
      </div>

      <div
        className="absolute bottom-20 left-20 animate-bounce"
        style={{ animationDelay: "4s" }}
      >
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white/30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22C6.66,19.09 8.14,15.83 12,15C9.33,13.33 10,7 10,7C17,7 20,13 18,16C16,19 13,19 12,19C16,19 19,16 20,14C21,12 21,11 17,8Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[600px] lg:min-h-[700px] py-12 lg:py-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <div className="mb-6">
              <p className="text-white/90 text-lg lg:text-xl font-medium mb-4">
                Welcome to Fresh Harvest
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium text-white leading-tight mb-6">
                Fresh Fruits and <span className="block">Vegetables</span>
              </h1>
              <p className="text-white/80 text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                At Fresh Harvest, we are passionate about providing you with the
                freshest and most flavorful fruits and vegetables
              </p>
            </div>

            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-flex items-center group">
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Special Offer Card */}
            <div className="mt-12 lg:mt-16 relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto lg:mx-0 relative">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-green text-sm font-medium mb-1">
                      Special Offer
                    </p>
                    <h3 className="text-2xl font-heading font-medium text-black mb-2">
                      Fresh Salad
                    </h3>
                    <p className="text-green text-lg font-medium mb-4">
                      Up to <span className="text-3xl font-bold">70%</span> off
                    </p>
                    <div className="bg-green text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
                      CODE: FRESH25
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center ml-4">
                    <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22C6.66,19.09 8.14,15.83 12,15C9.33,13.33 10,7 10,7C17,7 20,13 18,16C16,19 13,19 12,19C16,19 19,16 20,14C21,12 21,11 17,8Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Arrow pointing to card */}
                <div className="absolute -top-4 left-8 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-white" />
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="relative">
                <div className="w-full h-[500px] lg:h-[600px] relative">
                  {/* Placeholder for main image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-green/20 rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-16 h-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22C6.66,19.09 8.14,15.83 12,15C9.33,13.33 10,7 10,7C17,7 20,13 18,16C16,19 13,19 12,19C16,19 19,16 20,14C21,12 21,11 17,8Z" />
                        </svg>
                      </div>
                      <p className="text-white/80 text-lg">
                        Fresh Produce Selection
                      </p>
                      <p className="text-white/60 text-sm mt-2">
                        Replace with actual product image
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="text-white/80 mb-4">
          <p className="text-sm font-medium">Download App:</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors duration-200">
            App Store
          </button>
          <button className="bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium transition-colors duration-200">
            Google Play
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
