#!/bin/zsh

for port in {10001..10005}; do
  pid=$(lsof -ti :$port)
  if [ -n "$pid" ]; then
    echo "Killing process $pid on port $port..."
    kill -9 $pid
  fi
done

echo "Starting Uvicorn on port 10001..."
uvicorn dashboard:app --reload --port 10001
