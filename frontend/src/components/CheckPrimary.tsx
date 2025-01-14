import { Dispatch, ReactNode, SetStateAction } from "react"

export default function CheckPrimary({
  id,
  type = "text",
  icon,
  children = "",
  isChecked,
  handleOnChange,
}: {
  id: string
  type: "text" | "icon"
  icon?: ReactNode
  children?: ReactNode
  isChecked: boolean
  handleOnChange: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className="flex items-center bg-bg-white dark:bg-bg-dark hover:bg-neutral-300/90 dark:hover:bg-neutral-800/90 transition ease-out duration-300 px-3 py-1 rounded-full cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        className={`${type === "icon" && "rounded-full"} cursor-pointer size-8`}
        onChange={(e) => handleOnChange(e.currentTarget.checked)}
        checked={isChecked}
      ></input>
      <label
        htmlFor={id}
        className="cursor-pointer select-none"
        onSelect={() => false}
      >
        {type === "icon" ? icon : children}
      </label>
    </div>
  )
}
