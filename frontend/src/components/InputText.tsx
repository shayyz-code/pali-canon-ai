import { Dispatch, SetStateAction } from "react"

type TInputTextProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
  className: string
  handleOnKeyUp: () => void
  error?: string | null
  setError?: Dispatch<SetStateAction<string | null>>
}

export default function InputText({
  value,
  setValue,
  placeholder,
  className,
  handleOnKeyUp,
  error = null,
  setError = () => {},
}: TInputTextProps) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={placeholder}
        className={`relative px-5 py-3 rounded-xl bg-bg-white dark:bg-bg-dark outline-none hover:bg-white/90 dark:hover:bg-neutral-900/80 transition-colors ease-out duration-300 ${className}`}
        onKeyDown={() => setError(null)}
        onKeyUp={(e) => {
          if (e.key === "Enter") handleOnKeyUp()
        }}
      />
      {error !== null && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </>
  )
}
