from flask import Flask, request, jsonify
from flask_cors import cross_origin
from lorem import *

app = Flask(__name__)

print("Running test server...")

@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    data = request.get_json()
    user_message = data.get('message')
    if user_message:
        test_response = f"user message: {user_message}; {japanese_lorem}"
        return jsonify({"response": test_response}), 200
    else:
        return jsonify({"error": "No message provided"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)