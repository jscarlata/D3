import random
import json
from datetime import datetime, timedelta

# Filepath for the generated json file
path = "./test_data.json"

# number of entries for the test
num_entries = 30

# number of leds
num_leds = 8

# period
start_time = datetime(2023, 8, 1, 0, 0, 0)
end_time = datetime(2023, 8, 30, 23, 59, 59)

test_data = []

for _ in range(num_entries):
    led = random.randint(0, num_leds - 1)
    signal = random.randint(0, 1)
    timestamp = start_time + timedelta(seconds=random.randint(0, int((end_time - start_time).total_seconds())))
    test_data.append({"LED": led, "Signal": signal, "Zeit": timestamp.strftime("%Y%m%d%H%M%S")})

# save as json
with open(path, "w") as json_file:
    json.dump(test_data, json_file, indent=4)

print(f'Test data has been saved in {path}.')
