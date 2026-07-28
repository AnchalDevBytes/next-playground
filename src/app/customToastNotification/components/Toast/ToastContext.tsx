"use client";
import { 
    useState,
    createContext,
    useRef
 } from "react";
import ToastContainer from "@/app/customToastNotification/components/Toast/ToastContainer";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error";
}

interface ToastContextType {
  showToast: (
    message: string,
    type: "success" | "error"
  ) => void;
}

export const ToastContext =
  createContext<ToastContextType | null>(null);


export function ToastProvider({children} : {children: React.ReactNode}) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

     // stores all timeout ids
    const timeoutRef = useRef<
        Map<number, ReturnType<typeof setTimeout>>
    >(new Map());

    const removeToast = (id: number) => {
        const timer = timeoutRef.current.get(id);

        if (timer) {
            clearTimeout(timer);
            timeoutRef.current.delete(id);
        }

        setToasts((prev) =>
            prev.filter((toast) => toast.id !== id)
        );
    };

    const showToast = (
        message: string,
        type: "success" | "error"
    ) => {

        const id = Date.now();

        const toast = {
            id,
            message,
            type,
        };

        setToasts((prev) => [...prev, toast]);

        const timer = setTimeout(() => {
            removeToast(id);
        }, 3000);

        timeoutRef.current.set(id, timer);
    };


    return (
        <ToastContext.Provider
            value={{ showToast }}
        >
            {children}

            <ToastContainer
                toasts={toasts}
                removeToast={removeToast}
            />
        </ToastContext.Provider>
    )
}