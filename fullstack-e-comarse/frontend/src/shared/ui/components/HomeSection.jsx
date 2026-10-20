
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiInstance from "../../../config/apiInstance";

const HomeSection = () => {
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

  // Sabhi products ko mehange se saste order mein rakho
  const topProducts = [...products].sort(
    (a, b) => b.price.amount - a.price.amount
  );

  // Seed file ki 8 actual categories
  const categories = [
    "shirts",
    "tshirts",
    "hoodies",
    "jeans",
    "shoes",
    "dresses",
    "tops",
    "jackets",
  ];

  // Har category ka sabse mehanga product select karo
  const hotDeals = categories
    .map((category) => {
      const categoryProducts = topProducts.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      );

      if (categoryProducts.length === 0) {
        return null;
      }

      return categoryProducts[0];
    })
    .filter((product) => product !== null);

  // Must-Have Essentials ke liye top 8 sabse mehange products
  const essentialsProducts = topProducts.slice(0, 8);

  return (
    <div className="bg-white">
      {/* HOT DEALS */}
      <section className="px-4 py-8 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Hot Deals
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Explore our top categories and find what you love
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/user-header/category/all")
              }
              className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-orange-500"
            >
              View All
              <span className="text-orange-500">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {hotDeals.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(
                    `/user-header/category/${item.category}`
                  )
                }
                className="group cursor-pointer rounded-xl border border-gray-200 p-3 transition hover:border-orange-400 hover:shadow-md"
              >
                <div className="flex h-20 items-center justify-center sm:h-24">
                  <img
                    src={
                      Array.isArray(item.images)
                        ? item.images[0]
                        : item.images
                    }
                    alt={item.title}
                    className="h-full w-full object-contain transition group-hover:scale-105"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-1">
                  <h3 className="truncate text-xs font-semibold capitalize text-gray-800 sm:text-sm">
                    {item.category}
                  </h3>

                  <span className="text-orange-500">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MUST-HAVE ESSENTIALS */}
      <section className="bg-gray-50 px-4 py-8 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Must-Have Essentials
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Top picks loved by our customers
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/user-header/productcategory/all")
              }
              className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-orange-500"
            >
              View All Products
              <span className="text-orange-500">→</span>
            </button>
          </div>

          {essentialsProducts.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-500">
              Products loading or not available.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {essentialsProducts.map((item) => (
                <div
                  key={item._id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div 
                  onClick={()=>navigate(`/user-header/product-detail/${item._id}`)}
                  className="relative cursor-pointer flex h-36 items-center justify-center bg-gray-50 p-3 sm:h-44">
                    <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                      Top Pick
                    </span>

                    <button
                      aria-label={`Add ${item.title} to wishlist`}
                      className="absolute right-2 top-2 text-lg text-gray-500 hover:text-orange-500"
                    >
                      ♡
                    </button>

                    <img
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
                      }
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="truncate text-sm font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 truncate text-xs capitalize text-gray-500">
                      {item.category}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-orange-600">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: item.price.currency || "INR",
                          maximumFractionDigits: 0,
                        }).format(item.price.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
