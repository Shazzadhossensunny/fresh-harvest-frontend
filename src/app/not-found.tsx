"use client";

import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import Img404 from "../../public/images/404.svg";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-grey20 text-center font-body">
      <div className="max-w-4xl w-full space-y-10">
        {/* 404 Image */}
        <div
          className="relative aspect-video w-full"
          aria-label="404 error - Page not found"
        >
          <Image
            src={Img404}
            alt="404 - Page not found illustration"
            fill
            className="object-contain rounded-2xl"
            priority
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = "none";
            }}
          />
        </div>

        {/* Text content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-black">
            Oops! Page Not Found
          </h1>
          <p className="text-grey100 text-lg max-w-xl mx-auto">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Return Home Button */}
        <Link href="/" className="inline-flex justify-center">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium text-base hover:opacity-90 transition-all duration-300">
            <Home className="w-5 h-5" />
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
