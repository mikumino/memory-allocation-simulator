from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from simulator import *

app = Flask(__name__)
CORS(app)   # this is bad for production but we're not deploying this right LOL

# there's probably a better way to do this but im lazy!!
algos = {
    "first_fit": first_fit
}

# This endpoint initializes memory with random blocks and allocations, responds with the memory state
@app.route("/init_memory", methods=["POST"])
def init():
    try:
        data = json.loads(request.data)
        memory_size = data["memory_size"]
        min_block_size = data["min_block_size"]
        max_block_size = data["max_block_size"]
        memory = Memory(memory_size)
        random_memory_state(memory, min_block_size, max_block_size)
        return jsonify({"memory": memory.to_dict()})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True)