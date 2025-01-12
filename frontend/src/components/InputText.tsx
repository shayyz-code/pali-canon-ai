import { Dispatch, SetStateAction } from "react"

type TInputTextProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
  className: string
}

export default function InputText({
  value,
  setValue,
  placeholder,
  className,
}: TInputTextProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      placeholder={placeholder}
      className={`px-5 py-3 rounded-xl bg-bg-white dark:bg-bg-dark outline-none hover:bg-white/90 dark:hover:bg-neutral-900/80 transition-colors ease-out duration-300 ${className}`}
    />
  )
}
