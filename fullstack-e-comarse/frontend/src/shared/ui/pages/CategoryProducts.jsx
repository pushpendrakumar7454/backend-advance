
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiInstance from "../../../config/apiInstance";

export default function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiInstance.get("/products/find");

        setProducts(res.data.data);
      } catch (error) {
        console.log("Products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);


const filteredProducts = products.filter((item) => {
  return (
    item.category &&
    item.category.trim().toLowerCase() === category.trim().toLowerCase()
  );
});


  return (
    <section className="px-5 py-8">
      <h1 className="mb-6 text-2xl font-bold capitalize">
        {category} Products
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-48 w-full object-contain"
              />

              <h2 className="mt-3 font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 font-bold text-orange-500">
                {item.price.currency} {item.price.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
