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
    
    if words:
        test_response = (f"words: {words}; language: {language}; {japanese_lorem}"
                         if language == "Japanese" else
                         f"words: {words}; language: {language}; {lorem_latin}")
        return jsonify({"response": test_response}), 200
    else:
        return jsonify({"error": "No message provided"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)