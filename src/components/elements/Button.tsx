import React from "react";

interface CProps {
  onClickAction: (e: React.MouseEvent) => void;
  primary: boolean;
  children: string;
  disabled?: boolean;
  className?: string;
}
export default function Button({
  onClickAction,
  children,
  primary,
  disabled,
  className,
}: CProps) {
  return (
    <button
      className={`px-6 py-2 text-base rounded-md ${
        primary
          ? "bg-blue-800 text-zinc-100 hover:bg-blue-900 disabled:bg-blue-900 disabled:cursor-not-allowed cursor-pointer"
          : "bg-stone-800 hover:bg-stone-900 text-zinc-400 disabled:bg-stone-900 disabled:cursor-not-allowed  cursor-pointer"
      } ${className}`}
      onClick={(e) => onClickAction(e)}
      disabled={disabled ? disabled : false}
    >
      {children}
    </button>
  );
}
