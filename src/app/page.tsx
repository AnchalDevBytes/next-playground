"use client";

import useDebounce from "@/hooks/debounce";
import { useCallback, useEffect, useRef, useState } from "react";

interface Products {
  id: number;
  title: string;
}

const Limit = 10;

const HomePage = () => {

  // https://dummyjson.com/products?limit=10&skip=10&select=title,price

  const [products, setProducts] = useState<Products[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const debouncedValue = useDebounce(searchItem, 500);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchproducts = async () => {
    if(loading || !hasMore) return;
    setLoading(true);

    const skip = (page - 1) * Limit;

    const url = debouncedValue.trim() === '' 
        ?  `https://dummyjson.com/products?limit=${Limit}&skip=${skip}` 
        : `https://dummyjson.com/products/search?q=${debouncedValue}&limit=${Limit}&skip=${skip}`


    try {
      const response = await fetch(url);
      const result = await response.json();
      
      if(page === 1) {
        setProducts(result.products);
      } else {
        setProducts((prev) => [...prev, ...result.products]);
      }

      if(result.products.length < Limit) {
        setHasMore(false);
      }
      
    } catch (error) {
      if(error instanceof Error) {
        console.error("Unexpected Error", error);
      }
    }

    setLoading(false);
  };



  useEffect(() => {
    fetchproducts();
  }, [page, debouncedValue]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedValue]);


  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if(loading) return;

    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if(node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="search..."
          className="border px-4 py-2 rounded-md min-w-md max-w-md mb-8"
        />
      </div>

      <div className="space-y-4 flex items-center flex-col">
        {
          products.map((product, index) => {
            if(index === products.length - 1) {
              return (
                <div
                  ref={lastElementRef}
                  key={product.id}
                  className="border rounded p-4"
                >
                  {product.title}
                </div>
              )
            }


            return (
              <div
                key={product.id}
                className="border rounded p-4"
              >
                {product.title}
              </div>
            );
          })
        }
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && <p className="text-center mt-4">No more products to load.</p>}
    </div>
    
  )
}

export default HomePage;
