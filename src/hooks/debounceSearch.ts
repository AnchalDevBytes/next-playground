import { useEffect, useState } from "react";

export default function useDebounceSearch<T>(value: T, delay: number) {
    const [debouncedSearch, setDebouncedSearch] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedSearch;
}
