// components/TestimonialsSection.tsx
"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      role: "Professional Chef",
      content:
        "I absolutely love Fresh Harvest! The quality of their produce is outstanding. It’s always fresh, flavorful, and delicious. The convenience of ordering online and having it delivered to my doorstep saves me so much time. Fresh Harvest has become my go-to for all my fruit and vegetable needs.",
      rating: 5,
    },
    {
      id: 2,
      name: "John Smith",
      role: "Restaurant Owner",
      content:
        "As a restaurant owner, ingredient quality is everything. Fresh Harvest consistently delivers the freshest produce I've ever worked with. My customers constantly compliment the vibrant flavors in our dishes.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Health Enthusiast",
      content:
        "Switching to Fresh Harvest transformed my family's eating habits. The produce arrives crisp and full of flavor - you can taste the difference! Their seasonal selections have introduced us to fruits and vegetables we never would have tried otherwise.",
      rating: 4,
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Food Blogger",
      content:
        "The quality of Fresh Harvest's produce makes my food photography shine. The colors are vibrant, the textures are perfect, and most importantly, everything tastes as good as it looks. Their delivery service is always punctual too!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-grey20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-heading font-medium text-black mb-3">
            Testimonial
          </h1>
          <h2 className="text-3xl font-heading font-medium text-green mb-5">
            What Our Customers Say
          </h2>
          <p className="text-lg text-grey100 max-w-2xl mx-auto">
            Don't just take our word for it—here's what some of our customers
            have to say about their experience with Fresh Harvest
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              type: "bullets",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 1.2,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 1.5,
                centeredSlides: true,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 h-full">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Testimonial Content */}
                    <div className="flex-1">
                      <FaQuoteLeft className="text-green text-4xl mb-6" />
                      <p className="text-xl text-grey100 leading-relaxed mb-8">
                        {testimonial.content}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-heading font-medium text-black">
                            {testimonial.name}
                          </h3>
                          <p className="text-green">{testimonial.role}</p>
                        </div>
                        <div className="flex items-center mt-4 sm:mt-0">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-xl ${
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Customer Image */}
                    <div className="flex-shrink-0 flex justify-center">
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-green">
                        <div className="bg-gradient-to-br from-green/20 to-primary/30 w-full h-full flex items-center justify-center">
                          <div className="bg-white/80 w-32 h-32 rounded-full flex items-center justify-center">
                            <div className="w-24 h-24 bg-green/20 rounded-full flex items-center justify-center">
                              <svg
                                className="w-16 h-16 text-green"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="testimonial-prev w-12 h-12 rounded-full bg-white border border-green flex items-center justify-center hover:bg-green hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="testimonial-pagination flex items-center justify-center space-x-2"></div>
            <button className="testimonial-next w-12 h-12 rounded-full bg-white border border-green flex items-center justify-center hover:bg-green hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
