import { useContext, useState } from "react"
import { GlobalContext } from "./context/GlobalContext"
import { motion, AnimatePresence } from "motion/react"
import IconUser from "./components/icons/user"
import IconCommandLine from "./components/icons/command-line"
import InputText from "./components/InputText"
import BtnPrimary from "./components/BtnPrimary"
import IconArrowUpCircle from "./components/icons/arrow-up-circle"
import a from "indefinite"

export default function CareerModal() {
  const [input, setInput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const { version, career, setCareer } = useContext(GlobalContext)

  const handleSubmit = () => {
    const isAlphabetic = /^[a-zA-Z ]*$/.test(input)
    if (input !== "" && isAlphabetic) {
      localStorage.setItem("career", input)
      setCareer(input)
    } else {
      setError("please input valid words")
    }
  }

  return (
    <AnimatePresence>
      {career === null && (
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
            <p>
              Welcome, before we get started, I'd like to know about your career
              so that I can explain you well with examples on your career
              perspective.
            </p>
            <div
              className={`py-1 px-2 rounded-lg w-fit max-w-[90%] flex gap-2 self-start bg-bg-white dark:bg-bg-dark`}
            >
              <div>
                <IconCommandLine />
              </div>
              <div>What's your profession?</div>
            </div>
            <div
              className={`py-1 px-2 rounded-lg w-fit max-w-[90%] flex gap-2 self-end bg-primary-color flex-row-reverse`}
            >
              <div>
                <IconUser />
              </div>
              <div>I'm {input === "" ? "a/an ..." : a(input)}</div>
            </div>

            <div className="relative flex items-center p-4 gap-2 bg-bg-white dark:bg-bg-dark rounded-2xl">
              <InputText
                className="w-full"
                value={input}
                setValue={setInput}
                placeholder="eg: Business man, Engineer, etc."
                error={error}
                setError={setError}
                handleOnKeyUp={handleSubmit}
              />
              <BtnPrimary
                type="icon"
                icon={<IconArrowUpCircle />}
                handleOnClick={handleSubmit}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
