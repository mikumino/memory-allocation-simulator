from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from simulator import simulate, generate_processes, first_fit

app = Flask(__name__)
CORS(app)   # this is bad for production but we're not deploying this right LOL

# there's probably a better way to do this but im lazy!!
algos = {
    "first_fit": first_fit
}

@app.route("/simulate", methods=["POST"])
def simulate_allocation():
    try:
        data = json.loads(request.data)
        memory_size = data["memory_size"]
        processes = generate_processes(data["num_processes"], data["min_process_size"], data["max_process_size"])
        algorithm = algos[data["algorithm"]]

        simulation_data = simulate(memory_size, processes, algorithm, data["min_block_size"], data["max_block_size"])

        return jsonify(simulation_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True)