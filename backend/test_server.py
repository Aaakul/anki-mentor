from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

print("Running test server...")

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    if user_message:
        return jsonify({"response": f"user message: {user_message}"}), 200
    else:
        return jsonify({"error": "No message provided"}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)