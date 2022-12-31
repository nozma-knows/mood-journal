import React, { MouseEventHandler } from "react";
import PulseLoader from "react-spinners/PulseLoader";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  className?: string;
  secondary?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  onClick,
  label,
  className,
  secondary = false,
  loading,
  disabled = false,
}: ButtonProps) {
  const defaultLabel = "Select";

  return (
    <button onClick={onClick} disabled={disabled}>
      <div
        className={`${disabled ? "cta-disabled" : "cta"} ${className} ${
          secondary && "bg-white border border-gray-200"
        } bg-gray-200 p-4 rounded-xl`}
      >
        {loading ? (
          <PulseLoader color="white" size={8} />
        ) : (
          <span>{label || defaultLabel}</span>
        )}
      </div>
    </button>
  );
}
