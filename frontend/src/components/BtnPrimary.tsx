import { ReactNode } from "react"

export default function BtnPrimary({
  type = "text",
  icon,
  handleOnClick,
  children = "",
  className = "",
  variant = "primary",
}: {
  type: "text" | "icon"
  icon?: ReactNode
  handleOnClick: () => void
  children?: ReactNode
  className?: string
  variant?: "primary" | "error"
}) {
  return (
    <button
      onClick={handleOnClick}
      className={`${
        type === "icon" ? "" : ` w-fit py-2 px-4`
      } rounded-full transition-colors ease-out duration-300 ${
        variant === "primary"
          ? "bg-neutral-900 hover:bg-neutral-800"
          : "bg-red-700 hover:bg-red-600"
      } ${className}`}
    >
      {type === "icon" ? icon : children}
    </button>
  )
}
