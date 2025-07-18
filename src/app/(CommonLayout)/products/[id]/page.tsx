// src/app/products/[id]/page.tsx
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

// Types
interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Generate static params for SEO
export async function generateStaticParams() {
  try {
    const res = await fetch("https://code-commando.com/api/v1/products", {
      cache: "force-cache",
    });
    const json = await res.json();

    return json.data.map((p: any) => ({
      id: p._id || p.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Server-side data fetching for SEO
async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`https://code-commando.com/api/v1/products/${id}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// SEO metadata generation
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);

    return {
      title: `${product.productName} | Fresh Harvest`,
      description: product.description.substring(0, 160) + "...",
      keywords: `${product.productName}, fresh produce, organic, healthy food`,
      openGraph: {
        title: `${product.productName} | Fresh Harvest`,
        description: product.description.substring(0, 160) + "...",
        images: product.images.map((img) => ({
          url: img,
          width: 800,
          height: 600,
          alt: product.productName,
        })),
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.productName} | Fresh Harvest`,
        description: product.description.substring(0, 160) + "...",
        images: product.images,
      },
      alternates: {
        canonical: `/products/${params.id}`,
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found | Fresh Harvest",
      description: "The requested product could not be found.",
    };
  }
}

// Server Component - handles SEO and initial data
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // Fetch product data on the server for SEO
    const product = await getProduct(params.id);

    // Pass the server-fetched data to the client component
    return (
      <ProductDetailClient initialProduct={product} productId={params.id} />
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/products"
            className="bg-green hover:bg-green/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Browse All Products
          </a>
        </div>
      </div>
    );
  }
}
