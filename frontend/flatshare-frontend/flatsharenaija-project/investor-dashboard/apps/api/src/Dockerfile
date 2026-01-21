FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install fastapi uvicorn
CMD ["uvicorn","dashboard:app","--host","0.0.0.0","--port","10001"]
