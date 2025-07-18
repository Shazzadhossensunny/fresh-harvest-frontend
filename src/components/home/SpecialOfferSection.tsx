"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const SpecialOfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set target date (3 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-10 lg:py-20 bg-[#FFFFFF54] overflow-hidden">
      {/* Background Patterns */}
      <Image
        src="/images/offer_bg.png"
        alt="Background left"
        width={500}
        height={500}
        className="absolute bottom-0 left-0 w-64 lg:w-[400px] opacity-10"
      />
      <Image
        src="/images/offer_bg.png"
        alt="Background right"
        width={500}
        height={500}
        className="absolute top-0 right-0  w-64 lg:w-[400px] opacity-10 rotate-180"
      />

      {/* Green shape */}
      <div className="absolute -left-20 -bottom-10 rotate-[75deg] w-24 h-24 lg:w-32 lg:h-32 xl:w-48 xl:h-48 z-10">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200C0 89.543 89.543 0 200 0V200H0Z"
            fill="url(#greenGradient)"
            opacity="0.8"
          />
          <defs>
            <linearGradient
              id="greenGradient"
              x1="0"
              y1="0"
              x2="200"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#8BC34A" />
              <stop offset="100%" stopColor="#4CAF50" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative Leaves */}
      <Image
        src="/images/leaf.png"
        alt="Leaf top right"
        width={80}
        height={80}
        className="absolute top-8 right-1/4 lg:top-10 lg:right-1/3 rotate-[-90deg] z-10"
      />
      <Image
        src="/images/leaf-half.png"
        alt="Leaf bottom right"
        width={80}
        height={80}
        className="absolute bottom-5 right-2 lg:right-4 z-10"
      />

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 space-y-4">
            <span className="text-green bg-[#749B3F1A] text-sm lg:text-lg px-3 py-1 rounded font-medium inline-block font-heading">
              Special Offer
            </span>
            <h2 className="text-black font-heading text-3xl md:text-4xl lg:text-5xl xl:text-[80px] font-medium leading-tight">
              Seasonal Fruit Bundle
            </h2>
            <h3 className="text-lg lg:text-xl xl:text-5xl text-black font-medium">
              Discount up to <span className="text-primary">80% OFF</span>
            </h3>

            {/* Timer */}
            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hour", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Second", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 rounded-lg flex flex-col items-center justify-center"
                >
                  <span className="text-black text-xl lg:text-3xl font-heading">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-grey100 text-sm lg:text-lg font-normal">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Code */}
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 bg-[#176D38] px-6 py-3 lg:px-9 lg:py-4 rounded-full font-heading text-white text-lg lg:text-2xl cursor-pointer">
                <span>CODE:</span>
                <span className="text-[#FAC714]">FRESH28</span>
              </div>
            </div>
          </div>

          {/* Right Content - Fruit Image */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96">
                <Image
                  src="/images/fruits.png"
                  alt="Fruits"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferSection;
