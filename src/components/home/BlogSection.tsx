// components/BlogSection.tsx
import React from "react";
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
    },
    {
      id: 2,
      title:
        "Mastering Salad Creations: Tips and Tricks for Building Delicious and Nutritious Salads",
      date: "May 23, 2024",
      excerpt:
        "Learn the art of creating perfect salads with our expert tips and flavor combinations.",
      category: "Cooking Tips",
    },
    {
      id: 3,
      title:
        "The Art of Meal Prepping: How to Save Time and Eat Healthy Throughout the Week",
      date: "May 23, 2024",
      excerpt:
        "Transform your weekly routine with our efficient meal prepping strategies using fresh ingredients.",
      category: "Healthy Living",
    },
  ];

  return (
    <section className="py-16 bg-grey20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-heading font-medium text-black mb-3">
            Our Blog
          </h1>
          <h2 className="text-3xl font-heading font-medium text-green mb-5">
            Fresh Harvest Blog
          </h2>
          <p className="text-lg text-grey100 max-w-2xl mx-auto">
            Welcome to the Fresh Harvest Blog your go-to resource for all things
            related to fresh produce, healthy eating, and culinary inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog image placeholder */}
              <div className="relative h-60 bg-gradient-to-br from-green/20 to-primary/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 p-6 rounded-full">
                    <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-green"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zM7 9h10v2H7zm0 3h7v2H7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-green">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-green font-medium mb-2">
                  {post.date}
                </p>
                <h3 className="text-xl font-heading font-medium text-black mb-3">
                  {post.title}
                </h3>
                <p className="text-grey100 mb-5">{post.excerpt}</p>
                <a
                  href="#"
                  className="text-green font-medium inline-flex items-center group"
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
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green hover:bg-green/90 text-white px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center transition-colors duration-200">
            View All Blog Posts
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
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
