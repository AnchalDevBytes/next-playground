"use client";

import { createPortal } from "react-dom";
import Toast from "@/app/customToastNotification/components/Toast/Toast";


interface ToastItem {
    id: number;
    message: string;
    type: "success" | "error";
}

interface Props {
    toasts: ToastItem[];
    removeToast: (id: number) => void;
}

export default function ToastContainer({
    toasts,
    removeToast,

} : Props) {

    if(typeof window === "undefined") return null;

    return createPortal(
        <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={removeToast}
                />
            ))}
        </div>,
        document.body
    )
}