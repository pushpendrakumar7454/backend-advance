import React, { useState, useEffect } from "react";
import apiInstance from "../../../config/apiInstance";
import { useNavigate } from "react-router";

const ShopByCategory = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await apiInstance.get("/products/find");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Seed data se har category ke products count karna
  const categoryCounts = {};

  products.forEach((item) => {
    const category = item.category.trim().toLowerCase();

    if (categoryCounts[category]) {
      categoryCounts[category] = categoryCounts[category] + 1;
    } else {
      categoryCounts[category] = 1;
    }
  });

  // Seed data ki images ke saath 8 categories
  const categories = [
    {
      name: "Shoes",
      category: "shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop",
      description: "Everyday comfort",
    },
    {
      name: "T-shirts",
      category: "tshirts",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&auto=format&fit=crop",
      description: "Casual everyday style",
    },
    {
      name: "Shirts",
      category: "shirts",
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=700&auto=format&fit=crop",
      description: "Smart and stylish",
    },
    {
      name: "Accessories",
      category: "accessories",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&auto=format&fit=crop",
      description: "Complete your look",
    },
    {
      name: "Bags",
      category: "bags",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop",
      description: "Carry your essentials",
    },
    {
      name: "Footwear",
      category: "footwear",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop",
      description: "Step out in style",
    },
    {
      name: "Hoodies",
      category: "hoodies",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&auto=format&fit=crop",
      description: "Comfortable layers",
    },
    {
      name: "Jackets",
      category: "jackets",
      image:
        "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=700&auto=format&fit=crop",
      description: "Layer up in style",
    },
  ];

  return (
    <section className="bg-white px-4 py-8 text-gray-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-500">
              Explore Collection
            </p>

            <h2 className="text-xl font-bold sm:text-2xl">
              Shop by{" "}
              <span className="text-orange-500">Category</span>
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Find your everyday essentials.
            </p>
          </div>

          <button
            onClick={() => navigate("/user-header/category/shoes")}
            className="hidden items-center gap-1 text-sm font-semibold text-orange-500 transition hover:text-orange-600 sm:flex"
          >
            View All <span>→</span>
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {categories.map((item) => (
            <div
              key={item.category}
              onClick={() =>
                navigate(`/user-header/category/${item.category}`)
              }
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
            >
              {/* Image fills the entire image area */}
              <div className="h-36 overflow-hidden rounded-lg bg-gray-50 sm:h-44 md:h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Category name */}
              <div className="mt-3 flex items-center justify-between gap-1">
                <div>
                  <h3 className="text-sm font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-gray-500">
                    {item.description}
                  </p>
                </div>

                <span className="text-lg text-orange-500 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <button
          onClick={() => navigate("/user-header/category/shoes")}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-400 hover:text-orange-500 sm:hidden"
        >
          View All Categories <span>→</span>
        </button>

      </div>
    </section>
  );
};

export default ShopByCategory;