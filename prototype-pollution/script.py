import glob
import os
import subprocess
import sys


output_dir = "/tmp/ecma-sl"

for test in glob.glob("./**/symbolic_test_*.js", recursive=True):
    print(f"Running {test}:", end=" ", flush=True)
    try:
        output = subprocess.run(
                ["ecma-sl", "symbolic", "--workspace", output_dir, test],
                timeout=30,
                capture_output=True
        )
        stdout = output.stdout.decode()
    except subprocess.TimeoutExpired:
        stdout = ""

    if "I pollute" in stdout:
        print("It worked!")
    elif "All Ok!" in stdout:
        print("Nothing happened.")
    else:
        print("Nothing happened!")

