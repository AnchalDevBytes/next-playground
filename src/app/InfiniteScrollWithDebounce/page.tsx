"use client";

import useDebounce from "@/hooks/debounce";
import { useCallback, useEffect, useRef, useState } from "react";

interface Products {
    id: number;
    title: string;
}

//https://dummyjson.com/products/search?q=phone
// https://dummyjson.com/products?limit=10&skip=10

const LIMIT = 10;

const InfiniteScrollWithDebounce = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);


    const fetchProducts = async () => {
        if(loading || !hasMore) return;

        setLoading(true);

        const skip = (page - 1) * LIMIT;

        const url = debouncedValue.trim() === '' 
                ? `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
                : `https://dummyjson.com/products/search?q=${debouncedValue}&limit=${LIMIT}&skip=${skip}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
    
            if(page === 1) {
                setProducts(data.products);
            } else {
                setProducts((prev) => [...prev, ...data.products]);
            }

            if(data.products.length < LIMIT) {
                setHasMore(false);
            }

        } catch (error) {
            if(error instanceof Error) {
                console.error("UnExpected Error", error);
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, [page, debouncedValue]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [debouncedValue]);


    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if(loading) return;

        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((enteries) => {
            if(enteries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });

        if(node) observer.current.observe(node);
    }, [loading, hasMore]);

  return (
    <div className="bg-gray-900 min-h-screen">
        <div className="p-4 text-sm tracking-wider text-yellow-500">Infinte Scroll with Debounce</div>

        <div className="flex flex-col items-center justify-center">
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border p-4 rounded max-w-sm min-w-sm mb-10"
            />

            <div className="flex flex-col space-y-4">
                {
                    products.map((product, index) => {
                        if(index === products.length - 1) {
                            return (
                                <div
                                    ref={lastElementRef}
                                    key={product.id}
                                    className="border p-4 rounded"
                                >
                                    {product.title}
                                </div>
                            )
                        }

                        return (
                            <div
                                key={product.id}
                                className="border p-4 rounded"
                            >
                                {product.title}
                            </div>
                        )
                    })
                }
            </div>

            {loading && <div className="text-yellow-500 mt-4">Loading...</div>}
            {!hasMore && <div className="text-yellow-500 mt-4">No more products</div>}
        </div>

    </div>
  )
}

export default InfiniteScrollWithDebounce;
