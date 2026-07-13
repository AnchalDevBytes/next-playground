import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedalue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedalue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
