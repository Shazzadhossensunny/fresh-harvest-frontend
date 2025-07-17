// components/SpecialOfferSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const SpecialOfferSection = () => {
  const [revealed, setRevealed] = useState(false);
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

  const revealCode = () => {
    setRevealed(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("FRESH28");
    alert("Coupon code copied to clipboard!");
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Column */}
          <div className="flex-1 relative">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green/20 to-primary/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-block bg-white/80 p-10 rounded-full mb-6">
                    <div className="w-24 h-24 bg-green/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-green"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22C6.66,19.09 8.14,15.83 12,15C9.33,13.33 10,7 10,7C17,7 20,13 18,16C16,19 13,19 12,19C16,19 19,16 20,14C21,12 21,11 17,8Z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-4xl font-heading font-medium text-black">
                    Seasonal Fruit Bundle
                  </h3>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full z-0"></div>
          </div>

          {/* Content Column */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-heading font-medium text-white mb-4">
              Special Offer
            </h2>
            <h1 className="text-5xl font-heading font-medium text-white mb-6">
              Seasonal Fruit Bundle
            </h1>
            <p className="text-2xl text-white/90 mb-10">
              Discount up to <span className="font-bold">80% OFF</span>
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center lg:justify-start gap-4 mb-12">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hour" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Second" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-white/20 w-20 h-20 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-white">
                      {item.value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-white/80">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {revealed ? (
                  <>
                    <div className="flex items-center">
                      <span className="text-white text-xl font-medium">
                        CODE:
                      </span>
                      <span className="ml-2 text-white text-2xl font-bold tracking-widest">
                        FRESH28
                      </span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="bg-white hover:bg-white/90 text-green px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Copy Code
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-white text-xl font-medium">
                      HIDDEN COUPON CODE
                    </span>
                    <button
                      onClick={revealCode}
                      className="bg-white hover:bg-white/90 text-green px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Reveal Code
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferSection;
