import glob
import os
import subprocess
import shutil
import time

MAX_TIME = 30

def run(output_dir: str, test: str) -> tuple[str, float]:
    start = time.perf_counter()
    try:
        output = subprocess.run(
                ["ecma-sl", "symbolic", "--workspace", output_dir, test],
                timeout=MAX_TIME,
                capture_output=True
        )
        stdout = output.stdout.decode()
    except subprocess.TimeoutExpired:
        stdout = ""

    total_time = time.perf_counter() - start

    return (stdout, total_time)

def init_output_dir(dir: str):
    if os.path.exists(dir):
        shutil.rmtree(dir)

    os.makedirs(dir)

output_dir = "/tmp/ecma-sl"

results = [["test", "time", "result"]]

for test in glob.glob("./prototype-pollution/**/symbolic_test_*.js", recursive=True):
    print(f"Running {test}:", end=" ", flush=True)
    init_output_dir(output_dir)

    stdout, total_time = run(output_dir, test)
    if "Uncaught Error: I pollute" in stdout:
        print(f"It worked!", end=" ")
        result = "polluted"
    elif "All Ok!" in stdout:
        print("Nothing happened.", end= " ")
        result = "all ok"
    else:
        print("Nothing happened!", end= " ")
        result = "nothing"

    print(f"({total_time}s)", flush=True)

    results.append([test, str(total_time), result])

with open('results.csv', 'w') as f:
    _ = f.write('\n'.join(map(lambda l: ','.join(l), results)))
