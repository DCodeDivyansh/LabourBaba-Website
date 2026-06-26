import { ReactNode } from "react";

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconSize?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function PrimaryButton({
  title,
  onClick,
  icon,
  iconPosition = "right",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = true,
  className = "",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? "w-full" : ""}
        h-16
        rounded-2xl
        bg-[#FF5404]
        text-white
        text-xl
        font-semibold
        flex
        items-center
        justify-center
        gap-2
        shadow-lg
        transition
        hover:bg-orange-600
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <span>{title}</span>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
}
