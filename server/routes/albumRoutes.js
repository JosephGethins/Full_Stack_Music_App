const express = require("express");
const router = express.Router();
const db = require("../db");

// Create Album
router.post("/", (req, res) => {
  const { name, release_year, number_of_listens, artist_id } = req.body;

  if (!name || !release_year || !number_of_listens || !artist_id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  db.query(
    "INSERT INTO albums (name, release_year, number_of_listens, artist_id) VALUES (?, ?, ?, ?)",
    [name, release_year, number_of_listens, artist_id],
    (err, result) => {
      if (err) {
        console.error("Error inserting album:", err);
        return res.status(500).json(err);
      }
      res.json({ message: "Album added!", id: result.insertId });
    }
  );
});

// Fetch all albums
router.get("/", (req, res) => {
  db.query("SELECT * FROM albums", (err, results) => {
    if (err) {
      console.error("Error fetching albums:", err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// UPDATE album
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, release_year, number_of_listens, artist_id } = req.body;

  console.log("Received data for update:", req.body); // Log the incoming data

  if (!name || !release_year || !number_of_listens || !artist_id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedReleaseYear = Number(release_year);
  const parsedNumberOfListens = Number(number_of_listens);

  if (isNaN(parsedReleaseYear) || isNaN(parsedNumberOfListens)) {
    return res.status(400).json({ message: "Release year and number of listens must be numbers!" });
  }

db.query(
  "UPDATE albums SET name = ?, release_year = ?, number_of_listens = ?, artist_id = ? WHERE id = ?",
  [name, parsedReleaseYear, parsedNumberOfListens, artist_id, id],
  (err) => {
    if (err) {
      console.error("Error updating album:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Album updated!" });
  }
);
});


// DELETE album
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM albums WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Album deleted!" });
  });
});

module.exports = router;  