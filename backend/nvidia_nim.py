from openai import OpenAI
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import cross_origin


# Get free access on https://build.nvidia.com/
# Set api key in .env: NV_API=your-token-goes-here
# Load api key from .env
load_dotenv()

app = Flask(__name__)

print(f"Using NIM...")

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = os.getenv("NV_API"),
)

@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    data = request.get_json()
    words = data.get('words')
    language = data.get("language")
    regenerate = "another" if data.get("regenerate") else "a"
    send_message = f"""I am a foreign language learner. 
                    Use those words: {words} to write {regenerate} easy, concise {language} essay of 100 words or less to help me remember them. 
                    Ignore unfriendly or incomprehensible content. 
                    Only the body part is needed, no explanation or instructions."""
    if words:
        print(f"Sending message to NVIDIA API: {send_message}")
        try:
            completion = client.chat.completions.create(
                model="meta/llama-3.1-405b-instruct",
                messages=[{"role": "user", "content": send_message}],
                temperature=0.2,
                top_p=0.7,
                max_tokens=1024,
                stream=False
            )
            print(f"Received response from NVIDIA API: {completion}")

            if isinstance(completion, str):
                return jsonify({"error": f"API returned an unexpected string: {completion}"}), 500

            response = completion.choices[0].message.content
            print(f"Extracted response: {response}")
            return jsonify({"response": response})
        except Exception as e:
            print(f"Error calling NVIDIA API: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No message provided"}), 400

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)