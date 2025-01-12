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

type TMessage = {
  id: number
  content: string
  sentBy: "user" | "ai"
}

function App() {
  const [input, setInput] = useState<string>("")

  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext)

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
    // const path = "http://localhost"
    // const port = import.meta.env.VITE_PORT
    try {
      const res = await fetch(`/api/qa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: question }),
      })

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
      alert(`Api fetch failed. ${(error as Error).message}`)
    }
  }

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="flex gap-2 items-center px-5 py-2 rounded-2xl bg-bg-white dark:bg-bg-dark m-0 text-lg font-extrabold">
          <IconBookOpen />
          PaliCanon.ai
          <span className="bg-primary-color px-2 py-0 rounded-lg text-sm ml-2">
            v1.0
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
        className={`p-4 min-h-44 max-h-[600px] overflow-y-scroll flex flex-col gap-4`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`py-1 px-2 rounded-lg w-fit max-w-[90%] flex gap-2 ${
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
      </div>
      <div className="relative flex items-center p-4 gap-2 bg-bg-white dark:bg-bg-dark rounded-2xl">
        {isLoadingAnswer && (
          <div className="px-4 py-2 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-bg-white dark:bg-bg-dark rounded-2xl ">
            ...
          </div>
        )}

        <InputText
          className="w-full"
          value={input}
          setValue={setInput}
          placeholder="Ask me..."
        />
        <BtnPrimary
          type="icon"
          icon={<IconArrowUpCircle />}
          handleOnClick={handleQuestion}
        />
      </div>
      <Modal />
    </>
  )
}

export default App
