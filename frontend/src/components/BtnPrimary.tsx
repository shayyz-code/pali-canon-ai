import { ReactNode } from "react"

export default function BtnPrimary({
  type = "text",
  icon,
  handleOnClick,
  children = "",
}: {
  type: "text" | "icon"
  icon?: ReactNode
  handleOnClick: () => void
  children?: ReactNode
}) {
  return (
    <button
      onClick={handleOnClick}
      className={`${type === "icon" && "rounded-full"}`}
    >
      {type === "icon" ? icon : children}
    </button>
  )
}
