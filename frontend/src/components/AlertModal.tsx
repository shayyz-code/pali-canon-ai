import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { motion, AnimatePresence } from "motion/react"
import BtnPrimary from "./BtnPrimary"

export default function AlertModal() {
  const { version, appError, setAppError } = useContext(GlobalContext)

  return (
    <AnimatePresence>
      {appError !== null && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute backdrop-blur-md top-0 right-0 w-screen h-screen"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
            className="flex flex-col gap-6 fixed top-1/2 left-1/2 p-8 bg-bg-white dark:bg-bg-dark w-[80%] max-h-[80%] overflow-y-scroll rounded-xl"
          >
            <h1 className="m-0 text-lg font-extrabold">
              PaliCanon.ai
              <span className="bg-primary-color px-2 py-0 rounded-lg text-sm ml-2">
                v{version}
              </span>
            </h1>
            <p className="text-red-600">{appError}</p>
            <BtnPrimary
              type="text"
              handleOnClick={() => setAppError(null)}
              className="self-end"
            >
              Okay
            </BtnPrimary>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
