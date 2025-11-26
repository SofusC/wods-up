import json
import sqlite3

DB_PATH = "workouts.db"
JSON_PATH = "workouts.json"


def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        workouts = json.load(f)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    for w in workouts:
        title = w.get("title")
        posted_by = w.get("posted_by")
        workout_lines = w.get("workout")
        category = "Hero WODS" if "hero" in posted_by.lower() else "Cardio"

        # Insert into SQLite (category + difficulty default to NULL)
        cur.execute("""
            INSERT INTO workouts (category, title, workout_json)
            VALUES (?, ?, ?)
        """, (category, title, json.dumps(workout_lines)))

    conn.commit()
    conn.close()

    print(f"Imported {len(workouts)} workouts into {DB_PATH}")


if __name__ == "__main__":
    main()
