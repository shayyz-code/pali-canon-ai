# Pali Canon RAG AI: Buddha's Teachings Anthology

This repository contains a Retrieval-Augmented Generation (RAG) AI application that answers questions based on the book **"In the Buddha's Words: An Anthology of Discourses from the Pali Canon"**, compiled by Bhikkhu Bodhi. The application is built using a Go backend, a Python LangChain model, and a Vite-powered React frontend.

## Visit via [PaliCanon.ai](https://pali-canon-391775181531.asia-southeast1.run.app)

## Features

- **Interactive Q&A**: Ask questions and receive answers rooted in the Pali Canon.
- **Get example from your perspective**: Try the app.

## Tech Stack

- **Backend**: A Golang server to manage API requests and serve static assets.
- **Python AI Model**: Utilizes LangChain, Ollama and Nomic Embeddings for retrieval-augmented responses from the anthology.
- **Frontend**: A modern React interface with Vite for a fast and responsive user experience.

---

## Project Structure

```
frontend/
├── ...              #
│   ├── ...          # React + Vite Standard Frontend
│   └── ...          #
server/
├── chroma/             # Chroma DB Directory
│   ├── chroma.sqlite3  # SQLite3 Chroma DB
│   └── ...
├── dist/            # Vite build frontend
│   ├── index.html   # Static page
│   ├── assets/      # Static assets
│   └── ...
├── Dockerfile       # Dockerfile for containerization
├── requirements.txt # Python packages
├── qa.py            # Langchain QAChat model via JSON Output
├── go.sum           # Go module summary
├── go.mod           # Go modules
├── main.go          # Entry point for the Go server
└── server           # Main Entry Executable
```

---

## Requirements

### General Requirements

- Docker
- Go (1.23)
- Python (3.12.4)
- Node.js (20.17.0)

### Python Dependencies

Python dependencies are listed in `model/requirements.txt`:

```
chroma-hnswlib==0.7.6
chromadb==0.5.23
groq==0.15.0
json5==0.9.25
jsonpatch==1.33
jsonpointer==3.0.0
jsonschema==4.23.0
jsonschema-specifications==2023.12.1
langchain==0.3.14
langchain-chroma==0.2.0
langchain-community==0.3.14
langchain-core==0.3.29
langchain-groq==0.2.3
langchain-ollama==0.2.2
langchain-text-splitters==0.3.5
pypdf==5.1.0
python-dotenv==1.0.1
python-json-logger==2.0.7
```

Install them using:

```bash
pip install -r model/requirements.txt
```

### Frontend Dependencies

React and Vite dependencies are listed in `frontend/package.json`.
Install them using:

```bash
bun install
```

---

## Setup and Usage

### 1. Backend (Go)

Run the Go backend server:

```bash
cd server
go run main.go
```

### 2. AI Model (Python)

Run the Python AI model:

```bash
cd server
python3 qa.py text_query="Hey!"
```

Access the static frontend at [http://localhost:8080](http://localhost:8080).

### 3. Frontend (React + Vite)

Run the Vite development server:

```bash
cd frontend
bunx vite
```

Access vite frontend at [http://localhost:5173](http://localhost:5173).

---

## Docker Setup

### 1. Build and Run Containers

Build and start the application with Docker Compose:

```bash
docker buildx build .
```

This will start the backend, model, and frontend containers.

### 2. Access the Application

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:8080](http://localhost:8080)
- Python Model API: [http://localhost:8080/api/qa](http://localhost:8080/api/qa)

---

## Future Improvements

- Add user authentication for a personalized experience.
- Enhance the AI model with additional training data.
- Provide multi-language support.
- Optimize the Docker images for smaller builds.

---

## Acknowledgments

This application is inspired by the teachings of the Buddha and the work of Bhikkhu Bodhi in compiling **"In the Buddha's Words: An Anthology of Discourses from the Pali Canon"**.

---

## License

[MIT License](LICENSE)
