// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // CREATE song
// router.post('/', (req, res) => {
//   const { title, album-id } = req.body;
//   db.query('INSERT INTO songs (title, album-id) VALUES (?, ?)', [title, album-id], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: 'Song added!', id: result.insertId });
//   });
// });

// // READ all songs
// router.get('/', (req, res) => {
//   db.query('SELECT * FROM songs', (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

// // UPDATE song
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   db.query('UPDATE songs SET title = ? WHERE id = ?', [title, id], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: 'Song updated!' });
//   });
// });

// // DELETE song
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM songs WHERE id = ?', [id], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: 'Song deleted!' });
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// Create song
router.post("/", (req, res) => {
  const { name, release_year, album_id } = req.body; // Corrected variable names

  if (!name || !release_year || !album_id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  db.query(
    "INSERT INTO songs (name, release_year, album_id) VALUES (?, ?, ?)", // Corrected query column names
    [name, release_year, album_id], // Corrected variables for insertion
    (err, result) => {
      if (err) {
        console.error("Error inserting song:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Song added!", id: result.insertId });
    }
  );
});

// Fetch all songs
router.get("/", (req, res) => {
  db.query("SELECT * FROM songs", (err, results) => {
    if (err) {
      console.error("Error fetching songs:", err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// UPDATE song
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, release_year } = req.body;

  console.log("Received data for update:", req.body); // Log the incoming data

  if (!name || !release_year) {
    return res.status(400).json({ message: "Song name is required!" });
  }

  const parsedReleaseYear = Number(release_year);

  if (isNaN(parsedReleaseYear)) {
    return res.status(400).json({ message: "must be numbers!" });
  }

  db.query(
    "UPDATE songs SET name = ?, release_year = ? WHERE id = ?", 
    [name, parsedReleaseYear, id],
     (err) => {
      if (err) {
        console.error("Error updating album:", err);
        return res.status(500).json(err);
      }
    res.json({ message: "Song updated!" });
  });
});

// DELETE song
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM songs WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Song deleted!" });
  });
});

module.exports = router; 
