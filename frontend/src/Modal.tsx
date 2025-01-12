import { useContext } from "react"
import { GlobalContext } from "./context/GlobalContext"
import { motion, AnimatePresence } from "motion/react"

export default function Modal() {
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext)

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute backdrop-blur-md top-0 right-0 w-screen h-screen"
            onClick={() => setIsModalOpen(false)}
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
                v1.0
              </span>
            </h1>
            <p>
              This model is retrieval-augmented using{" "}
              <a
                href="https://en.wikipedia.org/wiki/Bhikkhu_Bodhi"
                target="_blank"
              >
                Bhikkhu Bodhi
              </a>
              's{" "}
              <i>
                In the Buddha's Words: An Anthology of Discuesses from the Pali
                Canon.
              </i>
            </p>
            <div className="flex flex-col items-center gap-4">
              <img
                src="/book-cover.jpg"
                alt="An Anthology of Discourses from the Pali Canon"
                className="rounded-xl w-44 shadow-2xl shadow-purple-600 my-16"
              />
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <span className="bg-primary-color rounded-sm px-1">Title:</span>
                <span>An Anthology of Discourses from the Pali Canon</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary-color rounded-sm px-1">
                  Author:
                </span>
                <span>Bhikkhu Bodhi</span>
              </li>
            </ul>
            <div className="flex flex-col items-center gap-4">
              <img
                src="/author.jpg"
                alt="An Anthology of Discourses from the Pali Canon"
                className="rounded-xl w-44 my-16"
              />
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <span className="bg-primary-color rounded-sm px-1">Name:</span>
                <span>Ven. Bhikkhu Bodhi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary-color rounded-sm px-1">Title:</span>
                <span>
                  President of the Buddhist Association of the United States
                </span>
              </li>
            </ul>
            <div className="mx-auto text-center my-10">
              For the sake of Peace by{" "}
              <a href="https://github.com/shayyz-code" target="_blank">
                Shayy
              </a>
            </div>

            <div className="mx-auto text-center mb-10 flex flex-col items-center gap-8">
              Find an issue? Fix it on Github{" "}
              <a
                href="https://github.com/shayyz-code/pali-canon-ai"
                target="_blank"
              >
                <img
                  src="/github-mark.svg"
                  alt="repo"
                  className="size-12 bg-white rounded-xl p-1 transform hover:scale-110 transition ease-out duration-300"
                />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
