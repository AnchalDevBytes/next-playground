import { ToastProvider } from "@/app/customToastNotification/components/Toast/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <ToastProvider>
        {children}
    </ToastProvider>
  );
}
