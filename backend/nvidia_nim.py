from openai import OpenAI
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Get free access on https://build.nvidia.com/
# Set api key in .env: NV_API=your-token-goes-here
# Load api key from .env
load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

print("Running...")

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = os.getenv("NV_API"),
)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    if user_message:
        completion = client.chat.completions.create(
            model="meta/llama-3.1-405b-instruct",
            messages=[{"role": "user", "content": user_message}],
            temperature=0.2,
            top_p=0.7,
            max_tokens=1024,
            stream=False 
        )
        response = completion.choices[0].message.content
        return jsonify({"response": response})
    else:
        return jsonify({"error": "No message provided"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000,)
