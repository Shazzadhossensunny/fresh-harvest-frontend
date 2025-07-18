import React from "react";
import { Leaf } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="pb-16 bg-grey20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Column */}
          <div className="flex-1 relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative w-full  rounded-3xl overflow-hidden">
                <img
                  src="/images/about.png"
                  alt="Fresh Harvest delivery person"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative leaf */}
              <div className="absolute top-6 -right-6 z-10">
                <Image
                  src="/images/leaf.png"
                  alt="Decorative leaf"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex-1">
            <div className="mb-6 space-y-4">
              <h6 className="text-green font-heading text-lg font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block">
                About us
              </h6>
              <h2 className="text-black font-heading text-5xl font-medium">
                About Fresh Harvest
              </h2>
              <p className="text-grey100 text-sm font-body">
                Welcome to Fresh Harvest, your premier destination for
                high-quality and fresh produce. We are passionate about
                providing you with the finest fruits, vegetables, and salad
                ingredients to nourish your body and delight your taste buds.
                With a commitment to excellence, sustainability, and customer
                satisfaction, Fresh Harvest is here to revolutionize your
                grocery shopping experience.
              </p>
            </div>
            <div className="mt-4">
              <button className="bbg-white hover:bg-primary text-primary hover:text-white border-2 border-primary px-8 py-4 rounded-lg font-heading text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
