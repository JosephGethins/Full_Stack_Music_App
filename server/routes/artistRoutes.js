const express = require('express');
const router = express.Router();
const db = require('../db'); // Import DB connection

// C - Create Artist
router.post('/', (req, res) => {
  const { name, monthly_listeners, genre } = req.body;

  // Make sure all fields are provided
  if (!name || !monthly_listeners || !genre) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  // Query to insert the artist into the database
  db.query(
    'INSERT INTO artists (name, monthly_listeners, genre) VALUES (?, ?, ?)',
    [name, monthly_listeners, genre],
    (err, result) => {
      if (err) {
        console.error('Error inserting artist:', err);
        return res.status(500).json(err);
      }
      res.json({ message: 'Artist added!', id: result.insertId });
    }
  );
});

// R
router.get('/', (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// U
router.put("/:id", (req, res) => {
  const { id } = req.params;
  // Note: using destructured names that match what you're sending from the client.
  const { name, monthlyListeners, genre } = req.body;

  if (!name || !monthlyListeners || !genre) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedMonthlyListeners = Number(monthlyListeners);
  if (isNaN(parsedMonthlyListeners)) {
    return res.status(400).json({ message: "Monthly listeners must be a number!" });
  }

  // Make sure to use the correct column name (monthly_listeners)
  db.query(
    "UPDATE artists SET name = ?, monthly_listeners = ?, genre = ? WHERE id = ?",
    [name, parsedMonthlyListeners, genre, id],
    (err) => {
      if (err) {
        console.error("Error updating artist:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Artist updated!" });
    }
  );
});


// D
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM artists WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Artist deleted!' });
  });
});

module.exports = router;
