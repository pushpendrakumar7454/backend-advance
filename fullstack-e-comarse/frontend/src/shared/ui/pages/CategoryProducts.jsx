
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiInstance from "../../../config/apiInstance";

export default function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await apiInstance.get("/products/find");
        setProducts(res.data.data);
      } catch (error) {
        console.log("Products fetch error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredProducts = products.filter((item) => {
    return (
      item.category &&
      item.category.trim().toLowerCase() ===
        (category || "").trim().toLowerCase()
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low") {
      return (a.price?.amount || 0) - (b.price?.amount || 0);
    }

    if (sortBy === "high") {
      return (b.price?.amount || 0) - (a.price?.amount || 0);
    }

    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* Header */}
      <section className="mx-4 mt-5 overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-orange-50 px-5 py-8 sm:mx-6 sm:px-8 sm:py-10 lg:mx-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-orange-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
                Explore Collection
              </p>
            </div>

            <h1 className="text-2xl font-semibold capitalize tracking-tight text-gray-900 sm:text-3xl">
              {category?.replace(/-/g, " ")}
              <span className="ml-2 text-orange-500">Collection</span>
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Find your favourites, all in one place.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900">
                {filteredProducts.length}
              </p>
              <p className="text-xs text-gray-500">Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="mx-4 mt-7 sm:mx-6 lg:mx-10">
        <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Discover products
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {filteredProducts.length} items in this collection
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-products"
              className="text-xs font-medium text-gray-500"
            >
              Sort by
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 outline-none transition hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-4 mb-12 mt-5 sm:mx-6 lg:mx-10">

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <div
                key={number}
                className="animate-pulse rounded-2xl border border-gray-100 bg-white p-3"
              >
                <div className="h-36 rounded-xl bg-gray-100 sm:h-48" />
                <div className="mt-4 h-3 w-1/3 rounded bg-gray-100" />
                <div className="mt-3 h-4 w-4/5 rounded bg-gray-100" />
                <div className="mt-3 h-9 rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white px-5 py-14 text-center">
            <p className="text-sm font-semibold text-gray-800">
              Products load nahi hue
            </p>
            <p className="mt-2 text-xs text-gray-500">
              API connection check karke page refresh karo.
            </p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-500">
              ✦
            </div>
            <h2 className="mt-4 text-base font-semibold text-gray-800">
              No products found
            </h2>
            <p className="mt-2 text-xs text-gray-500">
              Is category mein abhi products available nahi hain.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {sortedProducts.length}
                </span>{" "}
                products
              </p>

              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-orange-500">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Fresh finds
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {sortedProducts.map((item, index) => (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_10px_30px_-12px_rgba(249,115,22,0.22)] sm:p-3"
                >
                  {/* Image */}
                  <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3 sm:h-48 sm:p-5">
                    <span className="absolute left-2 top-2 z-10 rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-orange-600 shadow-sm">
                      PICK {index + 1}
                    </span>

                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : ""
                      }
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-orange-100" />
                  </div>

                  {/* Details */}
                  <div className="px-1 pb-1 pt-3">
                    <p className="truncate text-[10px] font-medium uppercase tracking-wider text-orange-500">
                      {item.brand || item.category?.trim()}
                    </p>

                    <h3 className="mt-1.5 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-gray-800 transition-colors group-hover:text-orange-600 sm:text-sm">
                      {item.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                      <span className="text-[10px] font-medium text-gray-400">
                        View item
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Bottom Section */}
      {!loading && !error && sortedProducts.length > 0 && (
        <section className="mx-4 mb-8 rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-6 text-center sm:mx-6 lg:mx-10">
          <p className="text-sm font-semibold text-gray-800">
            A little something you'll love
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Explore the collection and discover your next favourite.
          </p>
        </section>
      )}
    </main>
  );
}
