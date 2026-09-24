import { useEffect, useState } from "react";

type ShoppingItem = {
  name: string;
  completed: boolean;
};

const ShoppingList = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (trimmedSearch.length < 3) {
      setResult([]);
      setLoading(false);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.frontendeval.com/fake/food/${encodeURIComponent(trimmedSearch)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data: string[] = await response.json();

        setResult(data);
      } catch (err) {
        setResult([]);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleShoppingList = (item: string) => {
    const alreadyExists = shoppingList.some(
      (listItem) => listItem.name.toLowerCase() === item.toLowerCase()
    );

    if (alreadyExists) {
      alert('Item is already in the list')
      return;
    }

    setShoppingList((prev) => [
      ...prev,
      {
        name: item,
        completed: false,
      },
    ]);
  };

  const toggleItem = (itemName: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.name === itemName
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const removeItem = (itemName: string) => {
    setShoppingList((prev) =>
      prev.filter((item) => item.name !== itemName)
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-25 p-8">
      <div className="relative w-full max-w-xl">
        <div className="flex items-center w-full h-12.5 bg-white border border-gray-300 rounded-xl shadow-sm px-4 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <svg className="w-5 h-5 shrink-0 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
          </svg>

          <input
            type="text"
            value={search}
            placeholder="Search food like (tea, milk, etc)..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full bg-transparent outline-none border-0 text-gray-700 text-sm placeholder:text-gray-400"
          />

          {search && !loading && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setResult([]);
                setError("");
              }}
              className="appearance-none shrink-0 flex items-center justify-center w-7 h-7 p-0 m-0 rounded-full bg-gray-100 border-0 text-gray-400 hover:bg-gray-200 hover:text-gray-600 cursor-pointer transition"
              aria-label="Clear search"
            >
              X
            </button>
          )}

          {loading && (
            <div className="shrink-0 w-5 h-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          )}
        </div>

        {loading && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-4 text-sm text-gray-500">
              Searching...
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-red-200 rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-4 text-sm text-red-500">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && result.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {result.map((item, index) => (
              <button
                key={`${item}-${index}`}
                type="button"
                onClick={() => handleShoppingList(item)}
                className="appearance-none flex items-center w-full min-h-12 px-4 py-3 m-0 bg-white border-0 border-b border-gray-100 last:border-b-0 text-left text-sm text-gray-700 cursor-pointer transition-colors hover:bg-gray-50"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {!loading && !error && search.trim().length >= 3 && result.length === 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-4 text-sm text-gray-500">
              No results found.
            </div>
          </div>
        )}
      </div>

      {shoppingList.length > 0 && (
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Shopping List
              </h2>
            </div>

            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
              {shoppingList.length}
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {shoppingList.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.name)}
                      className="w-5 h-5 cursor-pointer accent-green-500"
                    />

                    <span
                      className={`text-sm font-medium ${
                        item.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.name)}
                  aria-label={`Remove ${item.name}`}
                  className="appearance-none shrink-0 flex items-center justify-center w-8 h-8 min-w-8 max-w-8 p-0 m-0 rounded-full border-0 bg-transparent text-gray-400 cursor-pointer hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;