import os
# from langchain_ollama import OllamaEmbeddings
from langchain_nomic import NomicEmbeddings

nomic_api_key = os.environ.get("NOMIC_API_KEY")

def get_embedding_function():
    embeddings = NomicEmbeddings(model="nomic-embed-text-v1.5", nomic_api_key=nomic_api_key, inference_mode="remote")

    return embeddings