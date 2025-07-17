// components/AboutSection.tsx
import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-16 bg-grey20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Column */}
          <div className="flex-1 relative">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden">
              {/* Image placeholder - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-green/20 to-green/40 flex items-center justify-center">
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
                    Fresh Harvests
                  </h3>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green/10 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
          </div>

          {/* Content Column */}
          <div className="flex-1">
            <h2 className="text-3xl font-heading font-medium text-green mb-4">
              About us
            </h2>
            <h1 className="text-5xl font-heading font-medium text-black mb-8">
              About Fresh Harvest
            </h1>

            <div className="space-y-6 text-lg text-grey100">
              <p>
                Welcome to Fresh Harvest, your premier destination for
                high-quality and fresh produce. We are passionate about
                providing you with the finest fruits, vegetables, and salad
                ingredients to nourish your body and delight your taste buds.
              </p>
              <p>
                With a commitment to excellence, sustainability, and customer
                satisfaction, Fresh Harvest is here to revolutionize your
                grocery shopping experience.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { number: "10+", label: "Years Experience" },
                { number: "100+", label: "Product Varieties" },
                { number: "50K+", label: "Happy Customers" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                  <p className="text-3xl font-heading font-medium text-green">
                    {item.number}
                  </p>
                  <p className="text-black mt-2">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-green hover:bg-green/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-flex items-center">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
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

              <button className="bg-white hover:bg-grey80 text-black border-2 border-green px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 inline-flex items-center">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
