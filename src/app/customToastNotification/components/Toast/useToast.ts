import { useContext } from "react";
import { ToastContext } from "@/app/customToastNotification/components/Toast/ToastContext";

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be inside ToastProvider"
    );
  }

  return context;
}
