import { ReactNode } from "react"

export default function BtnNav({
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
      className={`${
        type === "icon" && "rounded-xl"
      } bg-bg-white dark:bg-bg-dark p-2 hover:transform hover:bg-primary-color transition-all ease-out duration-300`}
    >
      {type === "icon" ? icon : children}
    </button>
  )
}
