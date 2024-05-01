from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from simulator import *

app = Flask(__name__)
CORS(app)   # this is bad for production but we're not deploying this right LOL

# there's probably a better way to do this but im lazy!!
algos = {
    "first_fit": first_fit,
    "best_fit": best_fit,
    "worst_fit": worst_fit,
    "next_fit": next_fit
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

# This endpoint generates a random process or a process with a specific memory requirement
@app.route("/processes", methods=["POST"])
def processes():
    try:
        data = json.loads(request.data)
        # if memory requirement isn't given, they want a random process
        memory = Memory(data["memory"]['memory']['size'], dict_to_blocks(data["memory"]['memory']['blocks']))
        if "memory_requirement" not in data and data["percent_of_free"] == -1:
            min_process_size = data["min_process_size"]
            max_process_size = data["max_process_size"]
            process = generate_process(memory, min_process_size, max_process_size)
            return jsonify({"process": process.to_dict()})
        # if percent is given, they want a pool that fills up to that percent of memory
        elif data["percent_of_free"] > -1:
            min_process_size = data["min_process_size"]
            max_process_size = data["max_process_size"]
            percent = data["percent_of_free"]
            process_pool = generate_process_pool(memory, min_process_size, max_process_size, percent)
            return jsonify({"process_pool": [process.to_dict() for process in process_pool]})
        # otherwise, they want a process with a specific memory requirement
        else:
            process = Process(generate_process_id(memory), data["memory_requirement"])
            return jsonify({"memory": memory.to_dict(), "process": process.to_dict()})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

# This endpoint frees a process from memory
@app.route("/processes", methods=["DELETE"])
def free():
    try:
        data = json.loads(request.data)
        memory = Memory(data["memory"]['memory']['size'], dict_to_blocks(data["memory"]['memory']['blocks']))
        selectedBlock = data["selectedBlock"]
        if (free_process(memory, selectedBlock) == False):
            return jsonify({"error": "Process could not be freed"}), 400
        merge_unallocated(memory)
        return jsonify({"memory": memory.to_dict()})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

# This endpoint frees all processes from memory
@app.route("/processes/all", methods=["DELETE"])
def free_all():
    try:
        data = json.loads(request.data)
        memory = Memory(data["memory"]['memory']['size'], dict_to_blocks(data["memory"]['memory']['blocks']))
        for i in range(len(memory.blocks)):
            free_process(memory, i)
        merge_unallocated(memory)
        return jsonify({"memory": memory.to_dict()})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400
    
# This endpoint frees a random process from memory
@app.route("/processes/random", methods=["DELETE"])
def free_random():
    try:
        data = json.loads(request.data)
        memory = Memory(data["memory"]['memory']['size'], dict_to_blocks(data["memory"]['memory']['blocks']))
        # ensure there is at least one process to free
        if (len([block for block in memory.blocks if block.allocated]) == 0):
            return jsonify({"error": "No processes to free"}), 400
        # free a random process
        while True:
            block_index = random.randint(0, len(memory.blocks) - 1)
            if free_process(memory, block_index):
                break
        merge_unallocated(memory)
        return jsonify({"memory": memory.to_dict()})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

@app.route("/allocate", methods=["POST"])
def allocate():
    try:
        data = json.loads(request.data)
        print(request.data)
        memory = Memory(data["memory"]['memory']['size'], dict_to_blocks(data["memory"]['memory']['blocks']))
        process = Process(data["process"]["id"], data["process"]["size"])
        algorithm = data["algorithm"]
        if (algos[algorithm](memory, process) == False):
            return jsonify({"error": "Process could not be allocated"}), 400
        return jsonify({"memory": memory.to_dict()})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400
    
@app.route("/allocate/all", methods=["POST"])
def allocate_all():
    try:
        data = json.loads(request.data)
        memory = Memory(data["memory"]['memory']['size'], dict_to_blocks(data["memory"]['memory']['blocks']))
        process_pool = data["process_pool"]
        algorithm = data["algorithm"]
        unallocated_processes = []
        for process in process_pool:
            if (algos[algorithm](memory, Process(process["id"], process["size"])) == False):
                unallocated_processes.append(process)
        return jsonify({"memory": memory.to_dict(), "unallocated_processes": unallocated_processes})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)