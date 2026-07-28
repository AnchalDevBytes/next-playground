"use client";
import { useRef, useState } from "react";
import Toast from "./components/Toast";

interface Toast {
    id: number;
    message: string;
    type: "success" | "error";
}

const CustomToastNotification = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const timers = useRef<Map<number, NodeJS.Timeout>>(new Map());

    const handleToast = () => {
        const id = Date.now();
        
        const newToast = {
            id,
            message: "Saved Successfully",
            type: "success" as const,
        };
        
        setToasts((prev) => [...prev, newToast]);

        const timer = setTimeout(() => {  //remove the toast id from array after 3 seconds.
            removeToast(id);
        }, 3000);

        timers.current.set(id, timer);
    };


    const removeToast = (id: number) => {
        const timer = timers.current.get(id);

        if(timer)  {
            clearTimeout(timer);
            timers.current.delete(id);
        }
        
        setToasts((prev) => 
            prev.filter((toast) => toast.id !== id)
        );
    }


  return (
    <div className="p-20">
        <button onClick={handleToast}>
            Show Toast
        </button>

        {toasts.map((toast) => (
            <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={() => removeToast(toast.id)}
            />
        ))}
    </div>
  )
}

export default CustomToastNotification;
