"use client";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const Toast = ({message, type, onClose} : ToastProps) => {
  return (
    <div
        className={`flex items-center justify-between gap-4 px-4 py-2 rounded-md text-white shadow-lg min-w-sm max-w-sm ${
            type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
    >
        {message}

        <button
            onClick={onClose}
            className="font-bold hover:text-gray-200"
        >
            x
        </button>
    </div>
  )
}

export default Toast;
