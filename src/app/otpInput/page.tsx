"use client";

import React, { useRef, useState } from "react";

const OtpInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < otp.length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        switch (e.key) {
            case "Backspace":
                if(otp[index]) {
                    const newOtp = [...otp];
                    newOtp[index] = "";
                    setOtp(newOtp)
                } else if(index > 0) {
                    inputRef.current[index - 1]?.focus();
                }
                break;

            case "ArrowLeft": 
                if(index > 0 ) {
                    inputRef.current[index - 1]?.focus();
                }
                break;

            case "ArrowRight" : 
                if(index < otp.length - 1) {
                    inputRef.current[index + 1]?.focus();
                }
                break;
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, otp.length);

        if(!pasted) return;

        const newOtp = [...otp];
        
        pasted.split("").forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);

        inputRef.current[pasted.length - 1]?.focus();
    }

  return (
    <div className="flex flex-col gap-10 p-10 items-center justify-center">
        <div className="flex gap-2">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRef.current[index] = el;
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    maxLength={1}
                    className="p-2 h-12 w-12 border rounded"
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                />
            ))}
        </div>
    </div>
  )
}

export default OtpInput;
