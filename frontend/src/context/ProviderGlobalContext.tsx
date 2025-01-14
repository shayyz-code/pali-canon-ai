import { ReactNode, useEffect, useState } from "react"
import { GlobalContext } from "./GlobalContext"

export default function ProviderGlobalContext({
  children,
}: {
  children: ReactNode
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [career, setCareer] = useState<string | null>(null)
  const [appError, setAppError] = useState<string | null>(null)
  useEffect(() => {
    setCareer(localStorage.getItem("career"))
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        version: 1.1,
        isModalOpen,
        setIsModalOpen,
        career,
        setCareer,
        appError,
        setAppError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
