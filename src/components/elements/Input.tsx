import React from "react";

interface CProps {
  type: string;
  placeholder: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  onKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  type,
  placeholder,
  min,
  max,
  onKeyChange,
  disabled,
}: CProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
      onChange={onKeyChange}
      className="px-6 py-2 text-base w-full bg-zinc-800 disabled:cursor-not-allowed rounded-md focus:outline-none border border-transparent focus:border-zinc-600 text-gray-100 outline-none "
    />
  );
}
