import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Split Background Design */}
      <div className="absolute inset-0">
        {/* Left side - White background */}
        <div className="absolute inset-0 lg:w-2/3 w-full bg-white" />

        {/* Right side - Food background with green overlay */}
        <div className="absolute inset-0 lg:left-4/5 left-0 lg:w-1/3 ml-auto w-full lg:block hidden">
          <Image
            src="/images/food.jpg"
            alt="Fresh vegetables background"
            fill
            className="object-cover"
            priority
          />
          {/* Green overlay */}
          <div
            className="absolute inset-0 bg-green/80"
            style={{ backgroundColor: "rgba(116, 155, 63, .95)" }}
          />
        </div>
      </div>

      {/* Decorative leaves */}
      <div className="absolute top-20 left-0 z-20">
        <Image
          src="/images/leaf.png"
          alt="Decorative leaf"
          width={120}
          height={120}
          className="opacity-60"
        />
      </div>
      <div className="absolute top-40 right-20 z-20">
        <Image
          src="/images/leaf.png"
          alt="Decorative leaf"
          width={80}
          height={80}
          className="opacity-40"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 lg:pb-20">
            <div className="space-y-4">
              <p className="text-green font-body text-lg font-medium">
                Welcome to Fresh Harvest
              </p>
              <h1 className="font-heading text-h1 text-black leading-tight">
                Fresh Fruits and Vegetables
              </h1>
              <p className="text-grey100 font-body text-body max-w-md">
                At Fresh Harvests, we are passionate about providing you with
                the freshest and most flavorful fruits and vegetables
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-body text-lg font-medium hover:bg-primary/90 transition-colors">
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
              <p className="text-black font-body text-base mb-4">
                Download App:
              </p>
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

          {/* Right Content - Girl with Vegetables positioned at bottom */}
          <div className="relative flex justify-center lg:justify-end items-end">
            <div className="relative">
              <Image
                src="/images/girl.png"
                alt="Girl with fresh vegetables"
                width={600}
                height={700}
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
