import { ReactNode, useState } from "react"
import { GlobalContext } from "./GlobalContext"

export default function ProviderGlobalContext({
  children,
}: {
  children: ReactNode
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <GlobalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </GlobalContext.Provider>
  )
}
