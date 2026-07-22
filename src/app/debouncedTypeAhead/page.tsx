"use client";

import useDebounce from "@/hooks/debounce";
import { useEffect, useRef, useState } from "react";

interface Products {
    id: number;
    title: string;
}

const DebouncedTypeAhead = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const controllerRef = useRef<AbortController | null>(null);

    const fetchProducts = async () => {
        if(!debouncedSearch.trim()) {
            setProducts([]);
            return;
        }

        if(controllerRef.current) {
            controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();

        try {
            setLoading(true);

            const response = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearch}`, {
                signal: controllerRef.current.signal,
            });

            if (!response.ok) {
                throw new Error("Network Error");
            }
        
            const result = await response.json();
    
            setProducts(result.products);
        } catch (error) {
            if(error instanceof Error && error.name === "AbortError") {
                return;
            } 
            console.error("Error while searching..", error);
        } finally {
            setLoading(false);   
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch]);

  return (
    <div className="flex justify-center p-20 bg-gray-800  text-white min-h-screen">
       <div className="flex flex-col gap-4">
            <div>
                <input 
                    type="text"
                    placeholder="Search..."
                    className="border p-4 rounded-xl max-w-sm min-w-sm mb-10" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {
                loading && (
                    <div>Loading...</div>
                )
            }
            <ul>
                {products.map((product) => (
                    <li
                        key={product.id}
                        onClick={() => {
                            setSearch(product.title);
                            setProducts([]);
                        }}
                    >
                        {product.title}
                    </li>
                ))}
            </ul>
       </div>
    </div>
  )
}

export default DebouncedTypeAhead;
