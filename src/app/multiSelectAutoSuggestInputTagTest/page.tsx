"use client";

import useDebounceSearch from "@/hooks/debounceSearch";
import React, { useEffect, useRef, useState } from "react";

interface User {
    id: number;
    firstName: string;
}

const MultiSelectAutoSuggestInputTagTest = () => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [selectedTags, setSelectedTags] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const debouncedValue = useDebounceSearch(search, 500);
    
    const controller = useRef<AbortController | null>(null);

    const cacheRef = useRef<Map<string, User[]>>(new Map());

    const [focusedIdx, setFocusedIdx] = useState(-1);

    const fetchUsers = async () => {
        if(!debouncedValue.trim()) {
            setSuggestions([]);
            return;
        };

        if(controller.current) {
            controller.current.abort();
        }

        controller.current = new AbortController();

        if(cacheRef.current.has(debouncedValue)) {
            setSuggestions(
                cacheRef.current.get(debouncedValue)!
            );

            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`https://dummyjson.com/users/search?q=${debouncedValue}`, {
                signal: controller.current.signal
            });

            if(!response.ok) {
                throw new Error("Network Error");
            }
            
            const result = await response.json();

            cacheRef.current.set(debouncedValue, result.users);

            setSuggestions(result.users);
        } catch (error) {
            if(error instanceof Error && error.name === "AbortError") {
                return;
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        fetchUsers();

        return () => controller.current?.abort();

    }, [debouncedValue]);

    const handleSelect = (user: User) => {
        const exists = selectedTags.some((tag) => tag.id === user.id);
        if(exists) return;

        setSelectedTags((prev) => [...prev, user]);
        setSuggestions([]);
        setSearch("");

        return;
    }

    const removeTag = (id: number) => {
        setSelectedTags((tags) => tags.filter((tag) => tag.id !== id));
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "ArrowUp") {
            setFocusedIdx((prev) => Math.max(prev - 1, 0));
        } else if(e.key === "ArrowDown") {
            setFocusedIdx((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if(e.key === "Enter") {
            e.preventDefault();

            if(focusedIdx >= 0) {
                handleSelect(suggestions[focusedIdx]);
            }
        } else if(e.key === "Backspace" && !search) {
            removeTag(selectedTags[selectedTags.length-1].id);
        } else if(e.key === "Escape") {
            setSuggestions([]);
        }
    }

    useEffect(() => {
        setFocusedIdx(-1);
    }, [suggestions]);

  return (
    <div
        className="flex flex-col items-center justify-center p-20 min-h-screen gap-10"
    >
        <div className="flex gap-4">
            {selectedTags.map((tag) => (
                <div
                    key={tag.id}
                    className="flex gap-2 border border-gray-400 p-2 rounded"
                >
                    {tag.firstName}
                    <span 
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => removeTag(tag.id)}
                    >
                        x
                    </span>
                </div>
            ))}
        </div>


        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-4 py-2 bg-gray-900"
                placeholder="Search..."
                onKeyDown={handleKey}
            />
        </div>

        {loading && <div>Loading...</div>}

        <ul className="flex flex-col gap-4">
            {suggestions.map((user, index) => (
                <li 
                    key={user.id}
                    onClick={() => handleSelect(user)}
                    className={`cursor-pointer ${focusedIdx === index ? "bg-red-600 p-2 rounded w-full" : ""}`}
                >
                    {user.firstName}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MultiSelectAutoSuggestInputTagTest;
