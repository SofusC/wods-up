// server.js (CommonJS) with structured JSON workouts
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'workouts.db'));

// Serve frontend
app.use(express.static('public'));

// Endpoint: get a random structured workout by category
app.get('/api/workouts/random', (req, res) => {
    const category = req.query.category;

    let query;
    let params = [];

    if (category && category.trim() !== '') {
        // Filter by category
        query = `
            SELECT title, difficulty, workout_json
            FROM workouts
            WHERE category = ?
            ORDER BY RANDOM()
            LIMIT 1
        `;
        params = [category];
    } else {
        // No category specified -> pick any workout
        query = `
            SELECT title, difficulty, workout_json
            FROM workouts
            ORDER BY RANDOM()
            LIMIT 1
        `;
        params = [];
    }

    db.get(query, params, (err, row) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        if (!row) return res.status(404).json({ error: 'No workouts found' });

        const workoutArray = JSON.parse(row.workout_json);
        res.json({
            title: row.title,
            difficulty: row.difficulty,
            workout: workoutArray
        });
    });
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
