"use client";

import { useEffect, useRef } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OTPInput({
  value,
  onChange,
  length = 6,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const values = Array.from({ length }, (_, index) => value[index] || "");

  const handleChange = (
    index: number,
    inputValue: string
  ) => {
    if (!/^\d*$/.test(inputValue)) return;

    const digit = inputValue.slice(-1);

    const updated = [...values];
    updated[index] = digit;

    onChange(updated.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !values[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    onChange(pasted);

    const focusIndex = Math.min(
      pasted.length,
      length - 1
    );

    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {values.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onPaste={handlePaste}
          onChange={(e) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          className="
            h-14
            w-14
            rounded-xl
            border
            border-border
            bg-background
            text-center
            text-xl
            font-semibold
            outline-none
            transition-all
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      ))}
    </div>
  );
}