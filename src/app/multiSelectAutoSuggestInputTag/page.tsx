"use client";
import useDebounce from "@/hooks/debounce";
import { useEffect, useRef, useState } from "react";

interface User {
    id: number;
    firstName: string;
}

const MultiSelectAutoSuggestInputTag = () => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [selectedTags, setSelectedTags] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const controllerRef = useRef<AbortController | null>(null);

    const cacheRef = useRef<Map<string, User[]>>(new Map());

    const fetchusers = async () => {
        if(!debouncedSearch.trim()) {
            setSuggestions([]);
            return;
        }

        if(controllerRef.current) {
            controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();

        if(cacheRef.current.has(debouncedSearch)) {
            setSuggestions(
                cacheRef.current.get(debouncedSearch)!
            );

            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`https://dummyjson.com/users/search?q=${debouncedSearch}`, {
                signal: controllerRef.current.signal,
            });
            const result = await response.json();

            cacheRef.current.set(debouncedSearch, result.users);

            setSuggestions(result.users);
        } catch (error) {
            if(error instanceof Error && error.name === "AbortError") {
                return;
            } else {
                console.error("Failed to fetch users", error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchusers();
    },[debouncedSearch]);

    const handleSelect = (user: User) => {
        const exists = selectedTags.some((tag) => tag.id === user.id);
        if(exists) return;

        setSelectedTags((prev) => [...prev, user]);

        setSearch("");
        setSuggestions([]);
    };

    const removeTag = (id: number) => {
        setSelectedTags((tags) => 
            tags.filter((tag) => tag.id !== id)
        );
    };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10 p-10">
        <div className="flex flex-col gap-10">
            <div className="flex gap-4  p-4 rounded-xl">
                {selectedTags.map((tag) => (
                    <span
                        key={tag.id}
                        className="text-sm border py-2 rounded-full px-3 flex gap-3"
                    >
                        {tag.firstName}
                        <button
                            onClick={() => removeTag(tag.id)}
                            className="text-red-500 text-xs"
                        >
                            X
                        </button>
                    </span>
                ))}
            </div>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="p-3 rounded-xl text-white border min-w-sm max-w-sm"
            />
        </div>

        {loading && <p>Loading...</p>}

        <ul className="flex flex-col gap-5 text-sm">
            {suggestions.map((user) => (
                <li
                    key={user.id}
                    onClick={() => handleSelect(user)}
                    className="cursor-pointer border border-gray-700 p-2 rounded min-w-xs max-w-xs bg-gray-900"
                >
                    {user.firstName}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MultiSelectAutoSuggestInputTag;
