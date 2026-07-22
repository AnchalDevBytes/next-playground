import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, delay: number) {

    const [throttleValue, setThrottleValue] = useState<T>(value);

    const lastExecuted = useRef(Date.now());
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const now = Date.now();
        const elapsed = now - lastExecuted.current;

        // Execute immediately if delay time has passed
        if(elapsed >= delay) {
            setThrottleValue(value);
            lastExecuted.current = now;
        } else {
            // Clear any existing timeout to avoid multiple executions
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setThrottleValue(value);
                lastExecuted.current = Date.now();
            }, delay - elapsed);
        }

        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };

    }, [value, delay]);
    
    return throttleValue;
}
