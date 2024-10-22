from flask import Flask, request, jsonify
from flask_cors import cross_origin
from lorem import *

app = Flask(__name__)

print("Running test server...")

@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    data = request.get_json()
    words = data.get('words')
    language = data.get("language") 
    regenerate = data.get("regenerate") 
    lorem = japanese_lorem if language == "Japanese" else lorem_latin
    if words:
        test_response = (f"From backend: Words: {words}; Regenerate: {regenerate}; Lorem text: {lorem};")
        return jsonify({"response": test_response}), 200
    else:
        return jsonify({"error": "No message provided"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)