import { ReactNode } from "react"

export default function BtnSecondary({
  type = "text",
  children = "",
  handleOnClick,
}: {
  type: "text" | "icon"
  icon?: ReactNode
  children?: ReactNode
  handleOnClick: () => void
}) {
  return (
    <button
      onClick={handleOnClick}
      className="flex items-center bg-bg-white dark:bg-bg-dark hover:bg-neutral-300/90 dark:hover:bg-neutral-800/90 px-4 py-2 border-none outline-none rounded-full cursor-pointer select-none transition ease-out duration-300"
    >
      {type === "text" && children}
    </button>
  )
}
