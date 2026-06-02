import os
import requests
from flask import Flask, jsonify, request

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify(status="ok", model=OLLAMA_MODEL)


@app.post("/chat")
def chat():
    data = request.get_json()
    message = data.get("message", "").strip()

    if not message:
        return jsonify(error="message is empty"), 400

    try:
        r = requests.post(
            f"{OLLAMA_URL}/api/chat",
            json={
                "model": OLLAMA_MODEL,
                "messages": [{"role": "user", "content": message}],
                "stream": False,
            },
            timeout=120,
        )
        reply = r.json()["message"]["content"]
    except Exception as e:
        return jsonify(error=str(e)), 502

    return jsonify(reply=reply)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
