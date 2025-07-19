// components/home/Hero.tsx
import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh]">
      {/* Split Background Design - Extended to top of header */}
      <div className="absolute inset-0 flex">
        {/* Left side - White background */}
        <div className="w-full lg:w-2/3 bg-[#FFFFFF1F]" />

        {/* Right side - Food background with green overlay */}
        <div className="hidden lg:block w-1/3 relative">
          <div className="absolute inset-0">
            <Image
              src="/images/food.jpg"
              alt="Fresh vegetables background"
              fill
              className="object-cover"
              priority
            />
            {/* Green overlay - extends to top of page */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(116, 155, 63, 0.95)" }}
            />
          </div>

          {/* Girl with Vegetables positioned at bottom right */}
          <div className="absolute bottom-0 right-0 w-full h-[85%]">
            <div className="relative w-full h-full">
              <Image
                src="/images/girl.png"
                alt="Girl with fresh vegetables"
                fill
                className="object-contain object-right-bottom"
                priority
                style={{ right: "0" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Leaves */}

      <Image
        src="/images/banner-leaf.png"
        alt="Leaf left right"
        width={80}
        height={80}
        className="absolute top-5 -left-1 lg:right-4  z-10"
      />

      {/* Container with same padding as header */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end min-h-[70vh] relative">
          <Image
            src="/images/leaf.png"
            alt="Leaf top right"
            width={80}
            height={80}
            className="absolute top-0 left-1/2 z-10"
          />
          {/* Left Content */}
          <div className="space-y-8 lg:pb-20">
            <div className="space-y-4 mb-8 ">
              <h6 className="text-green font-heading text-lg font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block">
                Welcome to Fresh Harvest
              </h6>
              <h1 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl xl:text-[80px] text-black leading-tight">
                Fresh Fruits and Vegetables
              </h1>
              <p className="text-grey100 font-body text-sm max-w-md">
                At Fresh Harvests, we are passionate about providing you with
                the freshest and most flavorful fruits and vegetables
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-heading text-lg font-semibold hover:bg-primary/90 transition-colors">
              Shop Now
            </button>

            {/* Special Offer with Arrow */}
            <div className="flex items-center gap-4 mt-12">
              <div className="relative">
                <Image
                  src="/images/arrow.png"
                  alt="Arrow pointing to offer"
                  width={100}
                  height={60}
                  className="transform rotate-12"
                />
              </div>

              <div className=" overflow-hidden">
                <Image
                  src="/images/special-product.png"
                  alt="Fresh salad"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>

            {/* App Download Section */}
            <div className="mt-12">
              <div className="relative">
                <Image
                  src="/images/leaf.png"
                  alt="Decorative leaf"
                  width={60}
                  height={60}
                  className="absolute -bottom-6 -left-6 -z-20"
                />
                <p className="text-grey100 font-body text-sm mb-4">
                  Download App:
                </p>
              </div>

              <div className="flex gap-4">
                <Image
                  src="/images/app.png"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
                <Image
                  src="/images/play.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
