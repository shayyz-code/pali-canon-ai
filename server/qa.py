import os
import json
import dotenv
import argparse
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
# from langchain_community.chat_models import ChatOllama
from langchain_groq import ChatGroq
# from langchain.memory import ChatMessageHistory, ConversationBufferMemory

dotenv.load_dotenv()

from get_embedding_function import get_embedding_function

CHROMA_PATH = "chroma"
QUESTIONER = "business man"
groq_api_key = os.environ.get("GROQ_API_KEY")

PROMPT_TEMPLATE = """
{question}

-----
Just greet back or assist if the above prompt is just a greeting.
If the question asks about you, reply "I'm an Ai trained on Bhikkhu Bodhi's Pali Canon.".
If the question says "what should i ask", reply with "You can ask me anything related to Pali Canon".
If the question says "Who is buddha?" or "What is Pali Canon", no example is needed.
If neither, answer in very short form, always based only on the following context,
If needed, finally support by giving example with the questioner's perspective to be more understandable.
But, if the question says "Who is buddha?" or "What is Pali Canon", no example is needed.
The questioner is a {questioner}.

Here is Buddha's Pali Canon:
{context}

---

"""

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    ans = query_rag(query_text)

    print(json.dumps(ans))


def query_rag(query_text: str):
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text, questioner=QUESTIONER)

    # model = ChatOllama(model="mistral")
    model_groq = ChatGroq(model="llama-3.3-70b-versatile",api_key=groq_api_key)
    # response_text = model.invoke(prompt)

    response_text = model_groq.invoke(input=prompt)
    

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = {"Ai": response_text.to_json(), "Sources": sources}
    return formatted_response

if __name__ == "__main__":
    main()