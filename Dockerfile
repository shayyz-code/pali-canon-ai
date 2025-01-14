FROM golang:1.23-alpine AS backend-build
WORKDIR /app
COPY server/go.mod server/go.sum server/main.go ./
COPY server/dist ./dist/
COPY server/qa.py server/get_embedding_function.py server/db.py ./
COPY server/chroma ./chroma/
RUN go mod download
RUN go build -o server .


# combine


FROM python:3.12

WORKDIR /app

COPY server/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install -U langchain-chroma
RUN pip install -qU langchain-nomic

COPY --from=backend-build /app /app

ENV VITE_PORT=8080

EXPOSE 8080

CMD ["./server"]