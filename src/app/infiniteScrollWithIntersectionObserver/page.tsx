"use client";
import useDebounce from "@/hooks/debounce";
import { useCallback, useEffect, useRef, useState } from "react";

const LIMIT = 10;

interface Product {
    id: number;
    title: string;
}

const InfiniteScrollWithIntersectionObserver = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const obeserver = useRef<IntersectionObserver | null>(null);
    
    const fetchProducts = async () => {
        if(loading || !hasMore) return;

        setLoading(true);

        const SKIP = (page - 1) * LIMIT;

        const url = debouncedValue.trim() === "" 
                        ? `https://dummyjson.com/products?limit=${LIMIT}&skip=${SKIP}` 
                        : `https://dummyjson.com/products/search?q=${debouncedValue}&limit=${LIMIT}&skip=${SKIP}`

        try {
            const response = await fetch(url);
            const result = await response.json();
    
            if(page === 1) {
                setProducts(result.products);
            } else {
                setProducts((prev) => [...prev, ...result.products]);
            }

            if(result.products.length < LIMIT) {
                setHasMore(false);
            }
        } catch (error) {
            if(error instanceof Error) {
                console.error(error);
                
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [page, debouncedValue]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    },[debouncedValue]);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if(loading) return;

        if(obeserver.current) obeserver.current.disconnect();

        obeserver.current = new IntersectionObserver((enteries) => {
           if (enteries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
           }
        });

        if(node) obeserver.current.observe(node);
    }, [loading, hasMore]);

  return (
    <div 
        className="flex flex-col items-center justify-center p-10 gap-10"
    >
        <div>
            <input 
                type="text"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border px-4 py-2 rounded min-w-sm max-w-sm"
            />
        </div>

        <div className="flex flex-col gap-6">
            {products.map((product, index) => {
                if(index === products.length - 1) {
                    return (
                        <div
                            ref={lastElementRef}
                            key={product.id}
                            className="border p-2 rounded"
                        >
                            {product.title}
                        </div>
                    )
                }

                return (
                    <div
                        key={product.id}
                        className="border p-2 rounded"
                    >
                        {product?.title}
                    </div>
                )
            })}
        </div>

        {loading && (
            <div>Loading...</div>
        ) }

        {!hasMore && (
            <div>No More Products</div>
        )}
    </div>
  )
}

export default InfiniteScrollWithIntersectionObserver;
