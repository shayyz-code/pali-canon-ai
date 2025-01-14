import { createContext, Dispatch, SetStateAction } from "react"

type TGlobalContext = {
  version: number
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  career: string | null
  setCareer: Dispatch<SetStateAction<string | null>>
  appError: string | null
  setAppError: Dispatch<SetStateAction<string | null>>
}

const DVGlobalContext: TGlobalContext = {
  version: 1.1,
  isModalOpen: false,
  setIsModalOpen: () => {},
  career: null,
  setCareer: () => {},
  appError: null,
  setAppError: () => {},
}

export const GlobalContext = createContext<TGlobalContext>(DVGlobalContext)
