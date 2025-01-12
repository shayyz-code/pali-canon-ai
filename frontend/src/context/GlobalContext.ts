import { createContext, Dispatch, SetStateAction } from "react"

type TGlobalContext = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const DVGlobalContext: TGlobalContext = {
  isModalOpen: false,
  setIsModalOpen: () => {},
}

export const GlobalContext = createContext<TGlobalContext>(DVGlobalContext)
