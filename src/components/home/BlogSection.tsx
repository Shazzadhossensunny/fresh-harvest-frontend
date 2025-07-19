"use client";
import Image from "next/image";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Exploring Seasonal Delights: A Guide to What's Fresh Right Now",
      date: "May 23, 2024",
      excerpt:
        "Discover the best seasonal produce available this month and how to incorporate them into your meals.",
      category: "Seasonal Guide",
      image: "/images/blog1.png",
    },
    {
      id: 2,
      title:
        "Mastering Salad Creations: Tips and Tricks for Building Delicious and Nutritious Salads",
      date: "May 23, 2024",
      excerpt:
        "Learn the art of creating perfect salads with our expert tips and flavor combinations.",
      category: "Cooking Tips",
      image: "/images/blog2.png",
    },
    {
      id: 3,
      title:
        "The Art of Meal Prepping: How to Save Time and Eat Healthy Throughout the Week",
      date: "May 23, 2024",
      excerpt:
        "Transform your weekly routine with our efficient meal prepping strategies using fresh ingredients.",
      category: "Healthy Living",
      image: "/images/blog3.png",
    },
  ];

  const handleReadMore = (e: any) => {
    e.preventDefault();
    // Do nothing - no navigation
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Leaf Images */}
        <div className="absolute top-10 right-1/4 w-16 h-16 ">
          <img
            src="/images/leaf.png"
            alt=""
            className="w-full h-full object-contain transform -rotate-12"
          />
        </div>
        <div className="text-center mb-14 space-y-4">
          <h6 className="text-green font-heading text-lg font-medium bg-[#749B3F1A] px-3 py-1 rounded-lg inline-block">
            Our Blog
          </h6>
          <h2 className="text-black font-heading text-5xl font-medium">
            Fresh Harvest Blog
          </h2>
          <p className="ext-grey100 text-sm font-body max-w-full md:max-w-lg lg:max-w-md mx-auto">
            Welcome to the Fresh Harvest Blog, your go-to resource for all
            things related to fresh produce, healthy eating, and culinary
            inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Blog Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-[20px] transition-transform duration-300 hover:scale-105"
                  onError={(e: any) => {
                    // Fallback image if blog image fails to load
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
                        <rect width="400" height="240" fill="#f0f9ff"/>
                        <circle cx="200" cy="120" r="40" fill="#10b981" opacity="0.3"/>
                        <path d="M160 120 L200 80 L240 120 L200 160 Z" fill="#10b981" opacity="0.5"/>
                      </svg>
                    `)}`;
                  }}
                />
              </div>

              <div className="pt-6">
                <p className="text-lg text-grey100  mb-2">{post.date}</p>
                <h3 className="text-lg font-heading font-medium text-black mb-4 leading-tight hover:text-green-600 transition-colors duration-200">
                  {post.title}
                </h3>

                <button
                  onClick={handleReadMore}
                  className="text-primary font-heading text-lg font-semibold inline-flex items-center group hover:underline transition-colors duration-200"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-200"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
