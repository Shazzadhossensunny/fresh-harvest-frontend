"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Professional chef",
    content:
      "I absolutely love Fresh Harvest! The quality of their produce is outstanding. It's always fresh, flavorful, and delicious. The convenience of ordering online and having it delivered to my doorstep saves me so much time. Fresh Harvest has become my go-to for all my fruit and vegetable needs.",
    image: "/images/testmonial1.png",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Restaurant Owner",
    content:
      "As a restaurant owner, ingredient quality is everything. Fresh Harvest consistently delivers the freshest produce I've ever worked with. My customers constantly compliment the vibrant flavors in our dishes.",
    image: "/images/testmonial1.png",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Health Enthusiast",
    content:
      "Switching to Fresh Harvest transformed my family's eating habits. The produce arrives crisp and full of flavor - you can taste the difference! Their seasonal selections have introduced us to fruits and vegetables we never would have tried otherwise.",
    image: "/images/testmonial1.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative">
        {/* Decorative Leaves */}
        <Image
          src="/images/leaf.png"
          alt="Leaf Left"
          width={60}
          height={60}
          className="absolute top-16 left-10"
        />
        <Image
          src="/images/leaf.png"
          alt="Leaf Right"
          width={60}
          height={60}
          className="absolute top-32 right-10"
        />
        <h6 className="text-green font-heading text-sm font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block">
          Testimonial
        </h6>

        <h2 className="text-black font-heading text-4xl lg:text-5xl font-medium mt-4">
          What Our Customers Say
        </h2>

        <p className="text-grey100 text-sm font-body max-w-lg mx-auto mt-4">
          Don't just take our word for it—here's what some of our customers have
          to say about their experience with Fresh Harvest.
        </p>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          className="testimonial-swiper mt-20"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
                {/* Image */}
                <div className="w-52 h-80 md:w-72 md:h-96 rounded-full relative">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                  {/* Carrot Icon */}
                  <Image
                    src="/images/three-line.png"
                    alt="Carrot"
                    width={40}
                    height={40}
                    className="absolute top-0 right-0"
                  />
                </div>

                {/* Testimonial Box */}
                <div className="relative bg-grey20 rounded-3xl p-8 max-w-xl text-left">
                  <p className="text-grey100 text-xl leading-relaxed mb-4">
                    "{t.content}"
                  </p>
                  <div className="flex items-center text-xl space-x-1">
                    <h3 className="font-heading font-medium text-black">
                      {t.name}
                    </h3>
                    <p className="text-grey100  font-normal"> - {t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
