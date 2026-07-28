"use client";
import { useToast } from "@/app/customToastNotification/components/Toast/useToast";

const CustomToastNotification = () => {
    const {showToast} = useToast();

  return (
    <div className="p-20 flex gap-10">
        <button
                onClick={() =>
                    showToast(
                        "Saved Successfully",
                        "success"
                    )
                }
                className="border-2 border-green-300 bg-green-200 p-2 rounded text-black"
            >
                Success Toast
            </button>

            <button
                onClick={() =>
                    showToast(
                        "Something went wrong",
                        "error"
                    )
                }
                className="border-2 border-red-300 bg-red-200 p-2 rounded text-black"
            >
                Error Toast
            </button>

        
    </div>
  )
}

export default CustomToastNotification;
