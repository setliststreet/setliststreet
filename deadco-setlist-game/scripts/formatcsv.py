import csv
from collections import Counter

input_file = "dead_and_co_setlists.csv"
output_file = "songs_import_ready.csv"

counter = Counter()

with open(input_file, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        name = row['song'].strip()
        set_type = row['set'].strip()
        counter[(name, set_type)] += 1

with open(output_file, "w", newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['name', 'set_type', 'frequency'])
    for (name, set_type), freq in counter.items():
        writer.writerow([name, set_type, freq])

print(f"Done! Output: {output_file}")