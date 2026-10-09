import { useState } from "react";

const products = [
  { id: 1, name: "iPhone 15", category: "Mobile", price: 70000 },
  { id: 2, name: "Samsung S24", category: "Mobile", price: 65000 },
  { id: 3, name: "MacBook Pro", category: "Laptop", price: 150000 },
  { id: 4, name: "Dell XPS", category: "Laptop", price: 120000 },
  { id: 5, name: "iPad Air", category: "Tablet", price: 60000 },
];

const FilterSearch = () => {
  const [searchItem, setSearchItem] = useState("");
  const [selectCategory, setSelectCategory] = useState("All");

  // Filter products by search text and category
  const filterProducts = products.filter((product) => {
    const matchesProduct = product.name
      .toLowerCase()
      .includes(searchItem.trim().toLowerCase());

    const matchesCategory =
      selectCategory === "All" ||
      product.category === selectCategory;

    return matchesProduct && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Product List
        </h1>

        {/* Search and Category Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            className="rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-500 sm:min-w-40"
          >
            <option value="All">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>

        {/* Product Count */}
        <p className="mb-4 text-sm text-gray-600">
          Showing {filterProducts.length} of {products.length} products
        </p>

        {/* Product List */}
        <div className="space-y-3">
          {filterProducts.length > 0 ? (
            filterProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>

                <p className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <p className="text-lg font-semibold text-gray-800">
                No products found
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Try another search term or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchItem("");
                  setSelectCategory("All");
                }}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;