
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
      return a.price.amount - b.price.amount;
    }

    if (sortBy === "high") {
      return b.price.amount - a.price.amount;
    }

    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      {/* Premium Hero Section */}
      <section className="relative mx-3 mt-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-6 py-10 text-white shadow-xl sm:mx-6 sm:px-10 sm:py-14 lg:mx-10 lg:px-14">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Curated just for you
          </span>

          <h1 className="mt-5 text-4xl font-black capitalize tracking-tight sm:text-5xl lg:text-6xl">
            {category?.replace(/-/g, " ")}
            <span className="mt-1 block bg-gradient-to-r from-violet-300 via-pink-200 to-blue-300 bg-clip-text text-transparent">
              Collection.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Discover products made to match your style. Explore the collection
            and find your next favourite.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-lg">
              {filteredProducts.length} Products
            </span>

            <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
              Premium picks ✦
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 right-6 hidden select-none text-8xl font-black text-white/[0.06] md:block lg:right-12 lg:text-9xl">
          SHOP
        </div>
      </section>

      {/* Product Toolbar */}
      <section className="mx-4 mt-8 sm:mx-6 lg:mx-10">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
              The edit
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
              Explore products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Handpicked for your everyday needs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-products"
              className="whitespace-nowrap text-sm font-medium text-slate-500"
            >
              Sort by
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-w-36 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-4 mb-12 mt-6 sm:mx-6 lg:mx-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <div
                key={number}
                className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white p-4"
              >
                <div className="h-56 rounded-2xl bg-slate-100" />
                <div className="mt-5 h-4 w-2/3 rounded bg-slate-100" />
                <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
                <div className="mt-5 h-11 rounded-xl bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-100 bg-white px-5 py-16 text-center shadow-sm">
            <div className="text-4xl">⚠️</div>
            <h2 className="mt-4 text-xl font-bold">Products load nahi hue</h2>
            <p className="mt-2 text-sm text-slate-500">
              API connection check karke page refresh karo.
            </p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-3xl">
              ✦
            </div>
            <h2 className="mt-5 text-2xl font-extrabold">
              No products found
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Is category mein abhi products available nahi hain. Category ka
              naam backend ke data se match hona chahiye.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-900">
                  {sortedProducts.length}
                </span>{" "}
                results
              </p>

              <span className="text-xs font-semibold text-slate-400">
                NEW FINDS ✦
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((item, index) => (
                <article
                  key={item._id}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.25)]"
                >
                  {/* Product Image */}
                  <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-slate-50 to-violet-50/70 p-5">
                    <span className="absolute left-3 top-3 z-10 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-violet-700 shadow-sm">
                      Pick #{index + 1}
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

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-100/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Product Details */}
                  <div className="px-2 pb-2 pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-bold uppercase tracking-[0.15em] text-violet-600">
                        {item.brand || item.category?.trim()}
                      </span>

                      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                        In collection
                      </span>
                    </div>

                    <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-extrabold leading-6 text-slate-900 transition-colors group-hover:text-violet-700">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                      {item.description || "Discover the details of this product."}
                    </p>

                    <div className="mt-4 flex items-end justify-between gap-2 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Price
                        </p>

                        <p className="mt-1 text-xl font-black tracking-tight text-slate-900">
                          {item.price?.currency || "INR"}{" "}
                          {Number(item.price?.amount || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg text-white transition-all duration-300 group-hover:bg-violet-600 group-hover:shadow-lg group-hover:shadow-violet-200">
                        ↗
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Bottom Banner */}
      {!loading && !error && sortedProducts.length > 0 && (
        <section className="mx-4 mb-8 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-blue-50 p-6 text-center sm:mx-6 sm:p-8 lg:mx-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Your style, your choice
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
            Good finds. Great prices. ✨
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Keep exploring and discover something you love.
          </p>
        </section>
      )}
    </main>
  );
}
