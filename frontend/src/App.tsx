import { useState, useContext, useEffect } from "react"
import InputText from "./components/InputText"
import BtnNav from "./components/BtnNav"
import IconInformationCircle from "./components/icons/information-circle"
import { GlobalContext } from "./context/GlobalContext"
import BtnPrimary from "./components/BtnPrimary"
import IconArrowUpCircle from "./components/icons/arrow-up-circle"
import IconUser from "./components/icons/user"
import IconCommandLine from "./components/icons/command-line"
import Modal from "./Modal"
import IconBookOpen from "./components/icons/book-open"
import { AnimatePresence, motion } from "motion/react"
import CareerModal from "./CareerModal"
import CheckPrimary from "./components/CheckPrimary"
import AlertModal from "./components/AlertModal"
import ConfirmModal from "./components/ConfirmModal"
import BtnSecondary from "./components/BtnSecondary"

type TMessage = {
  id: number
  content: string
  sentBy: "user" | "ai"
}

function App() {
  const [input, setInput] = useState<string>("")
  const [isGiveExample, setIsGiveExample] = useState<boolean>(true)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const {
    version,
    career,
    setCareer,
    isModalOpen,
    setIsModalOpen,
    setAppError,
  } = useContext(GlobalContext)

  const [messages, setMessages] = useState<TMessage[]>([])

  const [isLoadingAnswer, setLoadingAnswer] = useState<boolean>(false)

  useEffect(() => {
    setMessages([
      {
        id: 0,
        content: "Mingalaba",
        sentBy: "ai",
      },
    ])
  }, [])

  const handleQuestion = async () => {
    if (input === "") {
      return
    }
    const question = input
    setLoadingAnswer(true)
    setInput("")
    setMessages([
      ...messages,
      {
        id: messages.length,
        content: question,
        sentBy: "user",
      },
    ])

    try {
      const res = await fetch(
        `${import.meta.env.DEV ? "http://127.0.0.1:8080" : ""}/api/qa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: question,
            questioner: career,
            is_give_example: isGiveExample,
          }),
        }
      )

      const resp = await res.json()

      if (!res.ok) {
        throw new Error(`Response: ${resp}`)
      }

      const { content } = resp["Ai"]["kwargs"]
      setMessages([
        ...messages,
        {
          id: messages.length,
          content: question,
          sentBy: "user",
        },
        {
          id: messages.length + 1,
          content,
          sentBy: "ai",
        },
      ])
      setLoadingAnswer(false)
    } catch (error) {
      setLoadingAnswer(false)
      setAppError(`Api fetch failed. ${(error as Error).message}.`)
    }
  }

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="flex gap-2 items-center px-5 py-2 rounded-2xl bg-bg-white dark:bg-bg-dark m-0 text-lg font-extrabold">
          <IconBookOpen />
          PaliCanon.ai
          <span className="bg-primary-color px-2 py-0 rounded-lg text-sm ml-2">
            v{version}
          </span>
        </h1>
        <nav className="flex items-center">
          <BtnNav
            type="icon"
            icon={<IconInformationCircle />}
            handleOnClick={() => setIsModalOpen(!isModalOpen)}
          />
        </nav>
      </header>
      <div
        className={`p-4 min-h-44 max-h-[560px] overflow-y-scroll flex flex-col gap-4`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`py-1 px-2 rounded-lg w-fit max-w-[90%] flex items-center gap-2 ${
              message.sentBy === "user"
                ? "self-end bg-primary-color flex-row-reverse"
                : "self-start bg-bg-white dark:bg-bg-dark"
            }`}
          >
            <div>
              {message.sentBy === "user" ? <IconUser /> : <IconCommandLine />}
            </div>
            <div>{message.content}</div>
          </div>
        ))}
        <AnimatePresence>
          {isLoadingAnswer && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`py-1 px-2 rounded-lg w-20 max-w-[90%] flex items-center gap-2 self-start bg-bg-white dark:bg-bg-dark
            `}
            >
              <div>
                <IconCommandLine />
              </div>
              <div className="typing-loader"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative flex items-center p-4 gap-2 bg-bg-white dark:bg-bg-dark rounded-2xl">
        <ul className="absolute -top-11 left-0 w-full flex justify-end px-2 gap-4">
          <li>
            <BtnSecondary
              type="text"
              handleOnClick={() => setIsConfirmModalOpen(true)}
            >
              Reset Profession
            </BtnSecondary>
          </li>
          <li>
            <CheckPrimary
              id="checkbox-example"
              type="text"
              isChecked={isGiveExample}
              handleOnChange={setIsGiveExample}
            >
              Give Example
            </CheckPrimary>
          </li>
        </ul>
        <InputText
          className="w-full"
          value={input}
          setValue={setInput}
          placeholder="Ask me..."
          handleOnKeyUp={handleQuestion}
        />
        <BtnPrimary
          type="icon"
          icon={<IconArrowUpCircle />}
          handleOnClick={handleQuestion}
        />
      </div>
      <ConfirmModal
        textContent="Are you sure you want to reset your profession?"
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
        onConfirm={() => {
          localStorage.clear()
          setCareer(null)
        }}
      />
      <AlertModal />
      <CareerModal />
      <Modal />
    </>
  )
}

export default App
